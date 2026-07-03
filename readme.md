# User Management REST API

A production-style **User Management REST API** built with **Node.js**, **Express.js**, and **MongoDB** following clean architecture and backend development best practices.

This project demonstrates REST API development, layered architecture, request validation, centralized error handling, and CRUD operations using modern backend technologies.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Zod
* Helmet
* CORS
* Morgan
* Dotenv

---

# Features

* Production-ready folder structure
* RESTful API design
* CRUD operations
* MongoDB integration using Mongoose
* Request validation using Zod
* Layered architecture (Routes → Controllers → Services → Models)
* Centralized error handling
* Custom API response format
* Environment variable configuration
* Security middleware
* Logging middleware
* Proper HTTP status codes
* Clean and maintainable code

---

# Project Structure

```text
backend-api
│
├── src
│   ├── config
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers
│   │   └── user.controller.js
│   │
│   ├── middlewares
│   │   ├── catchAsync.js
│   │   ├── error.middleware.js
│   │   ├── notFound.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models
│   │   └── user.model.js
│   │
│   ├── routes
│   │   ├── index.js
│   │   └── user.routes.js
│   │
│   ├── services
│   │   └── user.service.js
│   │
│   ├── utils
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── catchAsync.js
│   │
│   ├── validators
│   │   └── user.validation.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# User Model

```javascript
{
  _id,
  firstName,
  lastName,
  email,
  age,
  isActive,
  createdAt,
  updatedAt
}
```

---

# API Endpoints

## Health Check

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/v1/health` |

---

## Users

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/v1/users`     | Get all users     |
| GET    | `/api/v1/users/:id` | Get user by ID    |
| POST   | `/api/v1/users`     | Create a new user |
| PATCH  | `/api/v1/users/:id` | Update a user     |
| DELETE | `/api/v1/users/:id` | Delete a user     |

---

# Create User Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 25
}
```

---

# Update User Request

```json
{
  "firstName": "Jane",
  "age": 30
}
```

---

# Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users fetched successfully.",
  "data": []
}
```

---

# Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "body.email",
      "message": "Invalid email address"
    }
  ]
}
```

---

# HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK                    |
| 201         | Created               |
| 400         | Bad Request           |
| 404         | Not Found             |
| 409         | Conflict              |
| 500         | Internal Server Error |

---

# Installation

Clone the repository.

```bash
git clone https://github.com/BiplobSordar/user_management_backend.git
```

Move into the project directory.

```bash
cd user_management_backend
```

Install dependencies.

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
```

---

# Run the Application

Development mode

```bash
npm run dev
```

Production mode

```bash
npm start
```

The server will start on

```text
http://localhost:5000
```

---

# API Base URL

```text
http://localhost:5000/api/v1
```

---

# Architecture

```text
Client
    │
    ▼
Routes
    │
    ▼
Validation Middleware
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Mongoose Model
    │
    ▼
MongoDB
```

Error flow

```text
Client
    │
    ▼
Route
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
ApiError
    │
    ▼
Global Error Middleware
    │
    ▼
JSON Response
```

---

# Validation

Request validation is handled using **Zod**.

The API validates:

* Request body
* Route parameters
* Data types
* Required fields
* Email format
* Age limits

Invalid requests never reach the controller.

---

# Security

The project includes:

* Helmet
* CORS
* Environment variables
* Centralized error handling
* Request validation
* MongoDB schema validation

---

# Future Improvements

* Authentication using JWT
* Authorization (Role-Based Access Control)
* Password hashing with bcrypt
* Pagination
* Filtering
* Sorting
* Search
* File uploads
* API documentation using Swagger
* Unit and integration testing
* Docker support
* CI/CD pipeline
* Rate limiting
* Request sanitization

---

# Learning Outcomes

This project demonstrates:

* Express.js fundamentals
* REST API design
* MongoDB with Mongoose
* CRUD operations
* Layered architecture
* Service pattern
* Request validation
* Error handling
* Environment management
* Professional backend project structure
* Production-ready coding practices

---

# License

This project is created for learning and portfolio purposes.
