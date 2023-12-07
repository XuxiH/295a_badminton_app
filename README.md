CMPE295 final project-- badminton ML based application

Backend Endpoint
1. User registration: localhost:3001/badminton/users/register
request body JSON:{
    "name",(required)
    "zipCode",(optional)
    "yearsOfExpereince",(optional)
    "email",(required)
    "password".(required)
}

response JSON:
{   statusCode: 200, message: "Account Created" }
OR
{
    statusCode: 404,message: "Unkown error to create user account. Please try again later." 
}

2. User login: localhost:3001/badminton/users/login
request body JSON:
{
    "email",
    "password"
}

response JSON:
{
    statusCode: 200, message: "Welcome "
}
OR
{
    statusCode: 404,message: "User Not Found" 
}

3. Fetch user profile information:localhost:3001/badminton/users/email
request body JSON:
{
    "email": "test@hotmail.com"
}

response JSON:
{
  "statusCode": 200,
  "message": "Found user!",
  "body": {
    "_id": "65683803a7e6ed18569f1aa2",
    "email": "test191@hotmail.com",
    "name": "optionalTesting",
    "skillRating": 1500,
    "onlineStatus": false,
    "matchStaus": false,
    "createdAt": "2023-11-30T07:21:39.224Z",
    "updatedAt": "2023-12-06T21:25:59.536Z",
    "__v": 0,
    "yearsOfExpereince": 2,
    "zipCode": "12345",
    "age": 24,
    "gender": "F",
    "matchingDistance": 15,
    "playStyle": "single",
    "yourStory": "i am testing"
  }
}
OR
{
  "statusCode": 404,
  "message": "user not found"
}

4. api to update one user's online status: localhost:3001/badminton/users/updateUserOnlineStaus
request body JSON:
{
    "email": "test@hotmail.com"
}

response JSON:
{
  "statusCode": 200,
  "message": "Update user infor successfully."
}

OR:
{
  "statusCode": 404,
  "message": "Unkonw error to update user infor."
}

5. api to update one user's match status: localhost:3001/badminton/users/updateUserMatchStaus
request body JSON:
{
    "email": "test@hotmail.com"
}

response JSON:
{
  "statusCode": 200,
  "message": "Update user infor successfully."
}

OR:
{
  "statusCode": 404,
  "message": "Unkonw error to update user infor."
}

6. api to update one user's basic information: localhost:3001/badminton/users/updateUserInfo
request body JSON:
{
  "email": "test@hotmaiel.com", //required
  "name": "optional", //optional field
  "zipCode": "90876", //optioanl field
  "yearsOfExpereince": 2, //optional field
  "skillRating": 1800 //optional field
  "gender" : "F",
  "age": 24,
  "zipCode": "12345",
  "yearsOfExpereince" : 2,
  "playStyle":"single",
  "matchingDistance": 15,
  "yourStory": "i am testing"
}

response JSON:
{
  "statusCode": 200,
  "message": "Update user infor successfully."
}
OR:
{
  "statusCode": 404,
  "message": "Unkonw error to update user infor."
}

7. api to input invitation for single player: localhost:3001/badminton/gaming/inviteSinglePlayer
request body JSON:
{
  "invitorEmail": "test191@hotmail.com",
  "inviteeEmail":"test19@hotmail.com",
  "phoneNumber":"12323434325",
  "gamingDate":"gamingDate",
  "gameStartTime":"gameStartTime",
  "gameEndTime":"gameEndTime",
  "address":"address",
  "zipCode":"567568756"     
}
response JSON:
{
  "statusCode": 200,
  "message": "Invitation Created for, optionalTesting",
  "body": {
    "invitor": "test191@hotmail.com",
    "invitee": "test19@hotmail.com"
  }
}
OR:
{
  "statusCode": 404,
  "message": "Not be able to find the invitee in the system."
}

8. api to input invitation for double player: localhost:3001/badminton/gaming/inviteDoublePlayer
request body JSON:
{

  "invitorEmail": "test191@hotmail.com",
  "invitorPartnerEmail":"test19@hotmail.com",
  "inviteePlayer1Email":"test@hotmail.com",
  "inviteePlayer2Email": "test2@hotmail.com",
  "phoneNumber":"12323434325",
  "gamingDate":"gamingDate",
  "gameStartTime":"gameStartTime",
  "gameEndTime":"gameEndTime",
  "address":"address",
  "zipCode":"567568756"
      
}
response JSON:
{
  "statusCode": 200,
  "message": "Invitation Created for Double players, optionalTesting and optionalTesting",
  "body": {
    "invitor": "test191@hotmail.com",
    "partner": "test19@hotmail.com",
    "opponentPlayer1": "test@hotmail.com",
    "opponentPlayer2": "test2@hotmail.com"
  }
}

OR:
{
  "statusCode": 404,
  "message": "Not be able to find the this invitor's partner in the system."
}
OR:
{
  "statusCode": 404,
  "message": "Not be able to invite same player to be your partner or opponent at the same time."
}

9. api to find players list from invitation record: localhost:3001/badminton/users/findPlayersRecord
request body JSON:
{
"email": "test191@hotmail.com",
"gamingDate": "2023-10-27",
"gameStartTime":"10:20"
}
response JSON:
Double players gaming response: 
{
  "statusCode": 200,
  "message": "Found players list.",
  "body": {
    "partner": "test@hotmail.com",
    "opponent": [
      "test2@hotmail.com",
      "test1129@hotmail.com"
    ]
  }
}
Single players gaming response:
{
  "statusCode": 200,
  "message": "Found players list.",
  "body": {
    "opponent": "test@hotmail.com"
  }
}
OR:
{
  "statusCode": 404,
  "message": "No invitation record found!"
}
OR:
{
  "statusCode": 404,
  "message": "User Not Found"
}