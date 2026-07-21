# Backend API Documentation

## Authentication
Protected routes require a valid JWT token.

The token is expected in one of these places:
- A cookie named `token`
- An `Authorization` header in the form `Bearer <token>`

---

## POST /users/register

Registers a new user account and creates an authentication session.

### Description
This endpoint creates a new user record in the database. On success, it sets a JWT in an HTTP-only cookie named `token` and returns the created user in the response body.

### Request Method
- Method: `POST`
- URL: `/users/register`

### Required Request Body
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
- `fullname.lastname` (optional)
  - Type: string
- `email` (required)
  - Type: string
  - Must be a valid email address
- `password` (required)
  - Type: string
  - Minimum length: 6 characters

### Validation Rules
- `email` must be a valid email
- `fullname.firstname` must be at least 3 characters long
- `password` must be at least 6 characters long

### Success Response
- Status Code: `201 Created`
- Response body:
  - `message`: `User registered successfully`
  - `data`: created user information
- Cookie:
  - `token`: JWT stored in an HTTP-only cookie

### Error Responses
- Status Code: `400 Bad Request`
  - Returned when validation fails or required fields are missing

### Example Success Response
```json
{
  "statusCode": 200,
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "john",
      "lastname": "doe"
    },
    "email": "john@example.com",
    "createdAt": "2026-07-21T00:00:00.000Z",
    "updatedAt": "2026-07-21T00:00:00.000Z"
  }
}
```

---

## POST /users/login

Authenticates an existing user and creates an authentication session.

### Description
This endpoint verifies the provided credentials. On success, it sets a JWT in the `token` cookie and returns the authenticated user in the response body.

### Request Method
- Method: `POST`
- URL: `/users/login`

### Required Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Field Requirements
- `email` (required)
  - Type: string
  - Must be a valid email address
- `password` (required)
  - Type: string
  - Minimum length: 6 characters

### Validation Rules
- `email` must be a valid email
- `password` must be at least 6 characters long

### Success Response
- Status Code: `201 Created`
- Response body:
  - `message`: `User logged in successfully`
  - `data`: authenticated user information
- Cookie:
  - `token`: JWT stored in an HTTP-only cookie

### Error Responses
- Status Code: `400 Bad Request`
  - Returned when validation fails or required fields are missing
- Status Code: `401 Unauthorized`
  - Returned when the email or password is invalid

### Example Success Response
```json
{
  "statusCode": 200,
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "john",
      "lastname": "doe"
    },
    "email": "john@example.com"
  }
}
```

---

## GET /users/profile

Fetches the authenticated user's profile.

### Description
This is a protected route. It returns the currently authenticated user's data decoded from the JWT.

### Request Method
- Method: `GET`
- URL: `/users/profile`

### Authentication
Send a valid token either as:
- a `token` cookie, or
- an `Authorization: Bearer <token>` header

### Success Response
- Status Code: `200 OK`
- Response body:
  - `message`: `User data fetched successfully`
  - `data`: decoded user payload from the JWT

### Error Responses
- Status Code: `401 Unauthorized`
  - Returned when the token is missing, invalid, or blacklisted

### Example Success Response
```json
{
  "statusCode": 200,
  "success": true,
  "message": "User data fetched successfully",
  "data": {
    "_id": "<user-id>",
    "iat": 1760000000,
    "exp": 1760003600
  }
}
```

---

## GET /users/logout

Logs out the authenticated user.

### Description
This protected route clears the `token` cookie and blacklists the current token so it cannot be used again.

### Request Method
- Method: `GET`
- URL: `/users/logout`

### Authentication
Send a valid token either as:
- a `token` cookie, or
- an `Authorization: Bearer <token>` header

### Success Response
- Status Code: `200 OK`
- Response body:
  - `message`: `User logout successfully`

### Error Responses
- Status Code: `401 Unauthorized`
  - Returned when the token is missing, invalid, or already blacklisted

### Example Success Response
```json
{
  "statusCode": 200,
  "success": true,
  "message": "User logout successfully"
}
```
