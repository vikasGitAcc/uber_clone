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
- Status Code: `409 Conflict`
    - Returned when a user with the same email already exists

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

## POST /captain/register

Registers a new captain account and creates an authentication session.

### Description

This endpoint creates a new captain record in the database. On success, it sets a JWT in an HTTP-only cookie named `token` and returns the created captain in the response body.

### Request Method

- Method: `POST`
- URL: `/captain/register`

### Required Request Body

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "captain@example.com",
    "password": "password123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
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
- `vehicle.color` (required)
    - Type: string
    - Minimum length: 3 characters
- `vehicle.plate` (required)
    - Type: string
    - Minimum length: 3 characters
- `vehicle.capacity` (required)
    - Type: number
    - Minimum value: 1
- `vehicle.vehicleType` (required)
    - Type: string
    - Allowed values: `motorcycle`, `car`, `auto`

### Validation Rules

- `email` must be a valid email
- `fullname.firstname` must be at least 3 characters long
- `password` must be at least 6 characters long
- `vehicle.color` must be at least 3 characters long
- `vehicle.plate` must be at least 3 characters long
- `vehicle.capacity` must be an integer greater than or equal to 1
- `vehicle.vehicleType` must be one of `motorcycle`, `car`, or `auto`

### Success Response

- Status Code: `201 Created`
- Response body:
    - `message`: `Captain registered successfully`
    - `data`: created captain information
- Cookie:
    - `token`: JWT stored in an HTTP-only cookie

### Error Responses

- Status Code: `401 Unauthorized`
    - Returned when validation fails
- Status Code: `409 Conflict`
    - Returned when a captain with the same email already exists

### Example Success Response

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Captain registered successfully",
    "data": {
        "_id": "<captain-id>",
        "fullname": {
            "firstname": "john",
            "lastname": "doe"
        },
        "email": "captain@example.com",
        "vehicle": {
            "color": "black",
            "plate": "abc123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

---

## POST /captain/login

Authenticates an existing captain and creates an authentication session.

### Description

This endpoint verifies the provided captain credentials. On success it sets a JWT in an HTTP-only cookie named `token` and returns the authenticated captain in the response body.

### Request Method

- Method: `POST`
- URL: `/captain/login`

### Required Request Body

```json
{
    "email": "captain@example.com",
    "password": "password123"
}
```

### Field Requirements

- `email` (required): string, must be a valid email address
- `password` (required): string, minimum length: 6 characters

### Validation Rules

- `email` must be a valid email
- `password` must be at least 6 characters long

### Success Response

- Status Code: `201 Created`
- Response body:
    - `message`: `Captain logged in successfully`
    - `data`: authenticated captain information
- Cookie:
    - `token`: JWT stored in an HTTP-only cookie

### Error Responses

- Status Code: `400 Bad Request` — Returned when validation fails or required fields are missing
- Status Code: `401 Unauthorized` — Returned when the email or password is invalid

### Example Success Response

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Captain logged in successfully",
    "data": {
        "_id": "<captain-id>",
        "fullname": {
            "firstname": "john",
            "lastname": "doe"
        },
        "email": "captain@example.com",
        "vehicle": {
            "color": "black",
            "plate": "abc123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

---

## GET /captain/profile

Fetches the authenticated captain's profile.

### Description

This is a protected route. It returns the currently authenticated captain's full profile from the database.

### Request Method

- Method: `GET`
- URL: `/captain/profile`

### Authentication

Send a valid token either as:

- a `token` cookie, or
- an `Authorization: Bearer <token>` header

### Success Response

- Status Code: `200 OK`
- Response body:
    - `message`: `captain profile fetched successfully`
    - `data`: authenticated captain profile

### Error Responses

- Status Code: `401 Unauthorized`
    - Returned when the token is missing, invalid, or blacklisted

### Example Success Response

```json
{
    "statusCode": 200,
    "success": true,
    "message": "captain profile fetched successfully",
    "data": {
        "_id": "<captain-id>",
        "fullname": {
            "firstname": "john",
            "lastname": "doe"
        },
        "email": "captain@example.com",
        "vehicle": {
            "color": "black",
            "plate": "abc123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

---

## POST /captain/logout

Logs out the authenticated captain.

### Description

This protected route clears the `token` cookie and blacklists the current token so it cannot be used again.

### Request Method

- Method: `POST`
- URL: `/captain/logout`

### Authentication

Send a valid token either as:

- a `token` cookie, or
- an `Authorization: Bearer <token>` header

### Success Response

- Status Code: `200 OK`
- Response body:
    - `message`: `captain logged out successfully`

### Error Responses

- Status Code: `401 Unauthorized`
    - Returned when the token is missing, invalid, or already blacklisted

### Example Success Response

```json
{
    "statusCode": 200,
    "success": true,
    "message": "captain logged out successfully"
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

## POST /users/logout

Logs out the authenticated user.

### Description

This protected route clears the `token` cookie and blacklists the current token so it cannot be used again.

### Request Method

- Method: `POST`
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
