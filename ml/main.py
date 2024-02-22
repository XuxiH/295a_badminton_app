from fastapi import FastAPI
from math import e

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/1p")
async def onep(p1Elo: float, p2Elo: float, s1: int, s2: int):
    p1EloNew, p2EloNew = calc1pGame(p1Elo, p2Elo, s1, s2)
    return {"p1EloNew": p1EloNew,
            "p2EloNew": p2EloNew}

@app.get("/2p")
async def onep(t1p1Elo: float, t1p2Elo: float, t2p1Elo: float, t2p2Elo: float, s1: int, s2: int):
    t1p1EloNew, t1p2EloNew, t2p1EloNew, t2p2EloNew = calc2pGame(t1p1Elo, t1p2Elo, t2p1Elo, t2p2Elo, s1, s2)
    return {"t1p1EloNew": t1p1EloNew,
            "t1p2EloNew": t1p2EloNew,
            "t2p1EloNew": t2p1EloNew,
            "t2p2EloNew": t2p2EloNew}

# ===================================== UTIL FUNCS =====================================
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
        return scoreDeltaConstant * (delta - 1) / 20

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

    

