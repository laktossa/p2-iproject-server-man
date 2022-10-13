## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`

1. POST /register
   Description
   Sign Up / register as a new user
   Request:

body:
{
"username":STRING,
"email": STRING,
"password": STRING,
}
Response
201 - Created

{

"id": INTEGER,
"email": STRING,
}
400 - Bad Request

{
"message": "Email can't null"
}
OR
{
"message": "Username can't null"
}
OR
{
"message": "Username must be unique"
}
OR
{
"message": "Invalid email format"
}
OR
{
"message": "Email must be unique"
}
OR
{
"message": "Name can't null"
}
OR
{
"message": "Password can't null"
} 2. POST /login
Description
Sign in as a user
Request:

body:
{
"email": STRING,
"password": STRING,
}

Response
200 - OK

{
"accessToken": STRING,
"username": STRING,
"email": STRING,
}

Response (400 - Bad Request)

{
"message": "Required Email or Password"
}
Response (401 - Unauthorized)

{
"message": "Invalid Email or Password"
}

3. POST /payments
   Description
   payment
   Request:

body:
{
"item": STRING,
}

Response
200 - OK

{
"transactionToken": STRING,
}

Response (500 - ISE)
