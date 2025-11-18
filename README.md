# Backend Auth

A RESTful authentication and CRUD API built with Node.js, Express.js, and MongoDB.  
This project demonstrates secure user authentication, role-based authorization, and product management using protected API endpoints.  
Hosted on Render.

##Project Overview

This API provides:

- User registration and login
- Secure authentication using hashed passwords and JWT
- Role-based authorization (user, admin)
- CRUD operations on products
- Protected routes that require a valid token
- Admin-only operations such as deleting users or creating products

Admins have elevated access and can:
- Create, update, and delete products   
- View all users
- Delete a user

# Installation and Setup Instructions.

1. Clone the repository
2. Install your dependencies
3. Create your own .env file
4. Start the server

# API endpoint list with request/response examples

Base URL:
- http://localhost:5000/api

Main route groups:
- /api/auth
- /api/product
- /api/user


# Authentication and role-based access explanation.

1. User registers with name, email, password.
2. Password is hashed using bcrypt before saving.
3. User logs in using email and password.
4. Server returns a signed JWT containing user ID and role.
5. Client must attach the token to protected routes using:
   Authorization: Bearer <token>

6. Authentication middleware verifies JWT.
7. Role-based middleware ensures only admins access admin routes.


# API Documentation

## Postman Collection

A complete Postman Collection is included for easy testing, containing:
- All authentication routes
- All product CRUD routes
- Admin routes
- Example requests & responses
- Token authentication flow

Download the Postman Collection here:
https://documenter.getpostman.com/view/46739172/2sB3WvNJac

# Auth Routes

1. POST /api/auth/register

 - request: The same also for the user, if no role is put, it adds user by default.
   {
  "name": "Steph",
  "email": "steph@example.com",
  "password": "mypassword",
  "role": "admin"
  }

- response
  {
  "status": "success",
  "message": "User registered successfully",
  "data": { "user": {}, "token": "..." }
  }

2. POST /api/auth/login

- request
  {
  "email": "steph@example.com",
  "password": "mypassword"
  }

- response
  {
  "status": "success",
  "message": "User logged in successfully ",
  "data": { "user": {}, "token": "..." }
  }


# Product Routes

3. POST /api/product/create  (admin only) requires token. 

- request
  {
  "name": "Television",
  "description": "Sleek flat screen television",
  "price": 125000,
  "inStock": true
  }

- response
  {
    "status": "success",
    "message": "Product created successfully",
    "data": { }
  }

4. GET /api/product/all - Get all products (public).

- request
 No request needed

- response
 {
    "status": "success",
    "data": [{}, {}, {},....]
 }

5. GET /api/product/:id
   Add the id of the product you want to get and send

- response
  {
    "status": "success",
    "data": {}
  }

6. PATCH /api/product/:id/update (admin only) - update products and requires token.

- request (also add the id of the product in your request head)
  {
   "name": "Television",
   "description": "Sleek flat screen television",
   "price": 150000,
   "inStock": false
  }

- response
  {
    "status": "success",
    "message": "Product updated successfully"
  }
  
7. DELETE /api/product/:id/delete  (admin only) requires token.

- request
   Add the id of the product you want to delete and send the request

  
- response
  {
    "status": "success",
    "message": "Product deleted Successfully"
  }

  
# Admin Routes

8. GET /api/user/users/ (Admin only) — gets all users. (requires admin token)

- request
   No request needed

- response
  {
    "status": "success",
    "data": [{}, {}, {},....]
 }

9. DELETE /api/user/:id (Admin only) -  delete a user. (requires admin token)


- request
  Add the id of the user you want to delete and send the request

- response
  {
    "status": "success",
    "message": "User deleted successfully"
  }


# HTTP Status Codes Used

200 – OK

201 – created

400 – Bad request (validation errors)

401 – Unauthorized (missing/invalid token)

403 – Forbidden (not an admin)

404 – Resource not found

500 – Server error


# Error Handling

The API uses centralized error handling middleware to ensure consistent JSON error responses:

- Invalid or expired tokens
- Missing required fields
- Validation errors
- Not found errors
- Server errors


