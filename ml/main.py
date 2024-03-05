from fastapi import FastAPI
from math import e
import pymongo
import pandas as pd
from sys import exit
from sklearn.linear_model import LogisticRegression
import os
from dotenv import load_dotenv

load_dotenv()

try:
    db = pymongo.MongoClient(os.getenv('MONGO_URI'))
    db.admin.command('ismaster')
except Exception as error:
    print("[ERROR] ", error)
    exit("Connection to MongoDB server failed, aborting...")
print("MongoDB server connected successfully!")



# ====================================== FASTAPI ROUTES ==============================================
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/1p") # calculate elo changes for 1v1
async def onep(p1Elo: float, p2Elo: float, s1: int, s2: int):
    p1EloNew, p2EloNew = calc1pGame(p1Elo, p2Elo, s1, s2)
    return {"p1EloNew": p1EloNew,
            "p2EloNew": p2EloNew}

@app.get("/2p") # calculate elo changes for 2v2
async def twop(t1p1Elo: float, t1p2Elo: float, t2p1Elo: float, t2p2Elo: float, s1: int, s2: int):
    t1p1EloNew, t1p2EloNew, t2p1EloNew, t2p2EloNew = calc2pGame(t1p1Elo, t1p2Elo, t2p1Elo, t2p2Elo, s1, s2)
    return {"t1p1EloNew": t1p1EloNew,
            "t1p2EloNew": t1p2EloNew,
            "t2p1EloNew": t2p1EloNew,
            "t2p2EloNew": t2p2EloNew}

@app.get("/trainml") # request training of a user's recommendation model
async def trainML(userEmail: str):
    # pull data from user and mldata
    mldata = db.badminton.mldata.find_one({"email": userEmail})
    targetUser = db.badminton.users2.find_one({"email": userEmail})

    if targetUser is None:
        return f"[ERROR] {userEmail} could not be found."
    if mldata is None:
        return f"[ERROR] {userEmail} has no data in mldata."

    # process users from choice list for pulling
    chosen = []
    notChosen = []
    for choice in mldata['choices']:
        if choice[2] == 0:
            chosen.append(choice[0])
            notChosen.append(choice[1])
        else:
            chosen.append(choice[1])
            notChosen.append(choice[0])
    
    # pull choice list users and populate dataframe
    choiceUserDF = pd.DataFrame(list(db.badminton.users2.find({"email": {"$in": chosen + notChosen}})))
    # print("==========================CHOICE=============================")
    # print(choiceUserDF)
    
    # generate comparison dataframe
    comparisonDF = make_comparison(targetUser, choiceUserDF)
    # print("==========================COMPARISON=============================")
    # print(comparisonDF)
    
    # generate preference dataframe
    preferenceDF = make_preference(mldata['choices'], comparisonDF)
    # print("==========================PREFERENCE=============================")
    # print(preferenceDF)

    # train logreg model and extract weights
    weights = runLR(preferenceDF)
    # print("==========================WEIGHTS=============================")
    # print(weights)

    # store weights to mongodb
    result = db.badminton.mldata.update_one({'_id': mldata['_id']}, {'$set': {'weights': weights}})
    # print(result)
    return f"[SUCCESS] model training completed for {userEmail}."

# recommendation routes
@app.get("/rec1user")
async def recOne(userEmail: str):
    # retrieve target user and their preference model weights
    targetUser = db.badminton.users2.find_one({"email": userEmail})
    targetUserMLData = db.badminton.mldata.find_one({"email": userEmail}, {"weights": 1})['weights']

    # retrieve entire userbase
    userbaseDF = pd.DataFrame(list(db.badminton.users2.find({"email": {"$ne": "bruceoconnor@sjsu.edu"}})))

    # generate comparison dataframe
    comparisonDF = make_comparison(targetUser, userbaseDF)

    # apply weights
    scoreDF = comparisonDF.loc[:,['email']]
    scoreDF["pref_score"] = comparisonDF.apply(apply_weights, axis=1, weights=targetUserMLData)
    scoreDF = scoreDF.sort_values(by=['pref_score'], ascending=False)
    print(scoreDF.iloc[0:8,0].to_list())
    

    return scoreDF.to_json()


@app.get("/rec2users")
async def recTwo(userEmail: str, partnerEmail: str):
    return 0




# ===================================== USER COMPARISON UTILS ===========================================
def age_diff(row, user):
    return abs(row['age'] - user['age'])

def format_compat_legacy(row, user):
    # 2 = format compatible
    # 1 = they play the other 2 player format, but wrong gender
    # 0 = they only play singles
    if user['gender'] == row['gender'] and 'd' in row['format']:
        return 2
    elif user['gender'] != row['gender'] and 'm' in row['format']:
        return 2
    elif user['gender'] == row['gender'] and 'm' in row['format']:
        return 1
    elif user['gender'] != row['gender'] and 'd' in row['format']:
        return 1
    else:
        return 0
    
def format_compat(row, user):
    # returns number of compatible formats, and allows for partial matches

    compat = 0
    if user['gender'] == row['gender']: # same genders, so doubles
        if 'd' in user['format'] and 'd' in row['format']:
            compat += 1
        elif ('m' in user['format'] or 'm' in row['format']) and ('d' in user['format'] or 'd' in row['format']): # partial match, one has doubles
            compat += 0.75
        elif 'm' in user['format'] and 'm' in row['format']: # partial match, both play mixed but not doubles
            compat += 0.5
        if 's' in user['format'] and 's' in row['format']: # perfect singles match
            compat += 1
    elif user['gender'] != row['gender']: # diff genders, so mixed
        if 'm' in user['format'] and 'm' in row['format']:
            compat += 1
        elif ('d' in user['format'] or 'd' in row['format']) and ('m' in user['format'] or 'm' in row['format']): # partial match, one has mixed
            compat += 0.75
        elif 'd' in user['format'] and 'd' in row['format']: # partial match, both play doubles but not mixed
            compat += 0.5
        if 's' in user['format'] and 's' in row['format']: # opp. gender singles match
            compat += 0.75

    return compat

def warehouse_dist(row, user, warehouse_dists): # unused???
    # now uses precalculated warehouse_dists numpy array
    return warehouse_dists[row['warehouse'], user['warehouse']]

def style_compat(row, user):
    if user['style'] == row['style']:
        return 2
    elif user['style'] == 'neutral' or row['style'] == 'neutral':
        return 1
    else:
        return 0

def rating_diff(row, user):
    return abs(row['skillRating'] - user['skillRating'])

def yoe_diff(row, user):
    return abs(row['yearsOfExperience'] - user['yearsOfExperience'])

def make_comparison(userDict, allUserDF):
    comparisons = pd.DataFrame()
    comparisons['email'] = allUserDF['email']
    comparisons['age_diff'] = allUserDF.apply(age_diff, axis=1, user=userDict)
    comparisons['yoe_diff'] = allUserDF.apply(yoe_diff, axis=1, user=userDict)
    comparisons['format_compat'] = allUserDF.apply(format_compat, axis=1, user=userDict)
    # comparisons['warehouse']
    comparisons['style_compat'] = allUserDF.apply(style_compat, axis=1, user=userDict)
    comparisons['rating_diff'] = allUserDF.apply(rating_diff, axis=1, user=userDict)
    comparisons['onlineStatus'] = allUserDF['onlineStatus'].astype(int)
    comparisons['matchStatus'] = allUserDF['matchStatus'].astype(int) 
    return comparisons

def make_preference(choices, comparisonDF):
    # preferenceDF = pd.DataFrame(columns=['age_diff', 'yoe_diff', 'format_compat', 'style_compat', 'rating_diff', 'onlineStatus', 'matchStatus', 'target'])
    preferenceSeries = []
    for choice in choices:
        u1 = comparisonDF[comparisonDF["email"] == choice[0]].iloc[0].drop("email")
        u2 = comparisonDF[comparisonDF["email"] == choice[1]].iloc[0].drop("email")
        diff = u2-u1
        diff["target"] = choice[2]
        preferenceSeries.append(diff)
    return pd.DataFrame(preferenceSeries)

def runLR(preferenceDF):
    X = preferenceDF.drop("target", axis=1)
    y = preferenceDF["target"]
    model = LogisticRegression()
    model.fit(X, y)
    weights = {
        "age_diff": model.coef_[0,0],
        "yoe_diff": model.coef_[0,1],
        "format_compat": model.coef_[0,2],
        "style_compat": model.coef_[0,3],
        "rating_diff": model.coef_[0,4],
        "onlineStatus": model.coef_[0,5],
        "matchStatus": model.coef_[0,6]
    }
    return weights
    
def apply_weights(row, weights):
    total = sum([row[key] * weights[key] for key in weights.keys()])
    return total



# ===================================== ELO UTIL FUNCS =====================================
def get2pUpsetMult(t1p1Elo, t1p2Elo, t2p1Elo, t2p2Elo, t1Score, t2Score, upsetConstant = 1):
        if t1Score >= t2Score:
            winningElo = (t1p1Elo + t1p2Elo) / 2
            losingElo = (t2p1Elo + t2p2Elo) / 2
        else: 
            winningElo = (t2p1Elo + t2p2Elo) / 2
            losingElo = (t1p1Elo + t1p2Elo) / 2

        return upsetConstant * losingElo / winningElo

def get1pUpsetMult(p1Elo, p2Elo, s1, s2, upsetConstant = 1):
        if s1 > s2:
            winningElo = p1Elo
            losingElo = p2Elo
        else:
            winningElo = p2Elo
            losingElo = p1Elo
        
        return upsetConstant * losingElo / winningElo

def getLobbyEloMult(lobbyElo, playerElo, win, constant = 0.002): # new version using sigmoid function
        # 1 / (1 - e^-x)
        if win:
            return 2 / (1 + e ** (constant * (playerElo - lobbyElo)))
        else:
            return 2 / (1 + e ** (-constant * (playerElo - lobbyElo)))
        
def getScoreDeltaMult(t1Score, t2Score, scoreDeltaConstant = 1):
        delta = abs(t1Score - t2Score)
        return scoreDeltaConstant * delta / 21 # used to be delta - 1

def calc2pGame(t1p1Elo, t1p2Elo, t2p1Elo, t2p2Elo, t1Score, t2Score, winElo = 100, lossElo = -100):
    upsetMult = get2pUpsetMult(t1p1Elo, t1p2Elo, t2p1Elo, t2p2Elo, t1Score, t2Score)
    scoreDeltaMult = getScoreDeltaMult(t1Score, t2Score)
    lobbyElo = sum([t1p1Elo, t1p2Elo, t2p1Elo, t2p2Elo]) / 4

    if t1Score > t2Score:
        t1p1Change = winElo * upsetMult * getLobbyEloMult(lobbyElo, t1p1Elo, True) * scoreDeltaMult
        t1p2Change = winElo * upsetMult * getLobbyEloMult(lobbyElo, t1p2Elo, True) * scoreDeltaMult
        t2p1Change = lossElo * upsetMult * getLobbyEloMult(lobbyElo, t2p1Elo, False) * scoreDeltaMult
        t2p2Change = lossElo * upsetMult * getLobbyEloMult(lobbyElo, t2p2Elo, False) * scoreDeltaMult

    else:
        t1p1Change = lossElo * upsetMult * getLobbyEloMult(lobbyElo, t1p1Elo, False) * scoreDeltaMult
        t1p2Change = lossElo * upsetMult * getLobbyEloMult(lobbyElo, t1p2Elo, False) * scoreDeltaMult
        t2p1Change = winElo * upsetMult * getLobbyEloMult(lobbyElo, t2p1Elo, True) * scoreDeltaMult
        t2p2Change = winElo * upsetMult * getLobbyEloMult(lobbyElo, t2p2Elo, True) * scoreDeltaMult

    t1p1EloNew = t1p1Change + t1p1Elo
    t1p2EloNew = t1p2Change + t1p2Elo
    t2p1EloNew = t2p1Change + t2p1Elo
    t2p2EloNew = t2p2Change + t2p2Elo

    return t1p1EloNew, t1p2EloNew, t2p1EloNew, t2p2EloNew

def calc1pGame(p1Elo, p2Elo, s1, s2, winElo = 100, lossElo = -100):
    upsetMult = get1pUpsetMult(p1Elo, p2Elo, s1, s2)
    scoreDeltaMult = getScoreDeltaMult(s1, s2)
    lobbyElo = sum([p1Elo, p2Elo]) / 2

    if s1 > s2:
        p1Change = winElo * upsetMult * getLobbyEloMult(lobbyElo, p1Elo, True) * scoreDeltaMult
        p2Change = lossElo * upsetMult * getLobbyEloMult(lobbyElo, p2Elo, False) * scoreDeltaMult
    else:
        p1Change = lossElo * upsetMult * getLobbyEloMult(lobbyElo, p1Elo, False) * scoreDeltaMult
        p2Change = winElo * upsetMult * getLobbyEloMult(lobbyElo, p2Elo, True) * scoreDeltaMult

    p1EloNew = p1Change + p1Elo
    p2EloNew = p2Change + p2Elo
    
    return p1EloNew, p2EloNew

    

