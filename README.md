CMPE295 final project-- badminton ML based application

Backend Endpoint
1. User registration: localhost:3001/badminton/users/register
request body JSON:{
    "name",
    "zipCode",
    "yearsOfExpereince",
    "email",
    "password"
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
