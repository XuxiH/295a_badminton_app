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
    "email": "test@hotmail.com",
    "name": "test1106",
    "zipCode": "56789",
    "yearsOfExpereince": 1,
    "skillRating": 1500,
    "onlineStatus": true,
    "matchStaus": false
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