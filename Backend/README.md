# Backend API Documentation

## POST /users/register

Registers a new user account and returns an authentication token.

### Description
This endpoint creates a new user record in the database. On success, it returns a JWT token and the created user details.

### Request Method
- Method: `POST`
- URL: `/users/register`

### Required Request Body
Send the request body as JSON with the following fields:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

### Field Requirements
- `fullname.firstname` (required)
  - Type: string
  - Minimum length: 3 characters
  - Must be provided in the request body.
- `fullname.lastname` (optional)
  - Type: string
  - If provided, it should be a valid string.
- `email` (required)
  - Type: string
  - Must be a valid email address.
- `password` (required)
  - Type: string
  - Minimum length: 6 characters.

### Validation Rules
The endpoint validates the incoming data before creating the user:
- `email` must be a valid email.
- `fullname.firstname` must be at least 3 characters long.
- `password` must be at least 6 characters long.
- `firstname`, `email`, and `password` are required for user creation.

### Success Response
- Status Code: `201 Created`
- Response body includes:
  - `message`: "User registered successfully"
  - `token`: authentication token for the newly created user
  - `user`: created user information

### Error Responses
- Status Code: `400 Bad Request`
  - Returned when validation fails or required fields are missing.
  - Response contains an `errors` array with details.

### Example Success Response
```json
{
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "token": "<jwt-token>",
    "user": {
      "_id": "<user-id>",
      "fullname": {
        "firstname": "john",
        "lastname": "doe"
      },
      "email": "john@example.com"
    }
  }
}
```

## POST /users/login

Authenticates an existing user and returns an authentication token.

### Description
This endpoint verifies the provided credentials and returns a JWT token along with the authenticated user details.

### Request Method
- Method: `POST`
- URL: `/users/login`

### Required Request Body
Send the request body as JSON with the following fields:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Field Requirements
- `email` (required)
  - Type: string
  - Must be a valid email address.
- `password` (required)
  - Type: string
  - Minimum length: 6 characters.

### Validation Rules
The endpoint validates the incoming data before attempting login:
- `email` must be a valid email.
- `password` must be at least 6 characters long.
- `email` and `password` are required for authentication.

### Success Response
- Status Code: `201 Created`
- Response body includes:
  - `message`: "User logged in successfully"
  - `token`: authentication token for the authenticated user
  - `user`: authenticated user information

### Error Responses
- Status Code: `400 Bad Request`
  - Returned when validation fails or required fields are missing.
- Status Code: `401 Unauthorized`
  - Returned when the email or password is invalid.

### Example Success Response
```json
{
  "statusCode": 201,
  "message": "User logged in successfully",
  "data": {
    "token": "<jwt-token>",
    "user": {
      "_id": "<user-id>",
      "fullname": {
        "firstname": "john",
        "lastname": "doe"
      },
      "email": "john@example.com"
    }
  }
}
```
