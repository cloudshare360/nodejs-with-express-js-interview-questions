# Employee REST API - Requirements Document

## Project Overview

### Purpose
Create a comprehensive REST API for Employee Management System with full CRUD operations, using JSON Server as a mock database and Express.js as the backend framework.

### Scope
- Employee data management (Create, Read, Update, Delete operations)
- Validation and error handling
- API testing through CURL commands and Postman collections
- Unit testing with Jest
- Complete documentation and setup instructions

## Functional Requirements

### 1. Employee Data Model
The Employee entity should contain the following attributes:

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| id | Number | Auto-generated | Unique identifier |
| firstName | String | Yes | 2-50 characters |
| lastName | String | Yes | 2-50 characters |
| email | String | Yes | Valid email format, unique |
| phone | String | Yes | Valid phone number format |
| department | Enum | Yes | Engineering, Marketing, Sales, HR, Finance, Operations |
| position | String | Yes | 2-100 characters |
| salary | Number | Yes | Positive number |
| hireDate | Date | Yes | ISO date format (YYYY-MM-DD) |
| status | Enum | No | active, inactive, terminated (default: active) |

### 2. API Endpoints

#### 2.1 GET /api/employees
- **Purpose**: Retrieve all employees
- **Parameters**: 
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of records per page
  - `department` (optional): Filter by department
  - `status` (optional): Filter by status
- **Response**: Array of employee objects with pagination info

#### 2.2 GET /api/employees/:id
- **Purpose**: Retrieve a specific employee by ID
- **Parameters**: `id` (required): Employee ID
- **Response**: Single employee object or 404 error

#### 2.3 POST /api/employees
- **Purpose**: Create a new employee
- **Body**: Employee data (JSON)
- **Response**: Created employee object with generated ID

#### 2.4 PUT /api/employees/:id
- **Purpose**: Update an existing employee
- **Parameters**: `id` (required): Employee ID
- **Body**: Updated employee data (JSON) - partial updates allowed
- **Response**: Updated employee object or 404 error

#### 2.5 DELETE /api/employees/:id
- **Purpose**: Delete an employee
- **Parameters**: `id` (required): Employee ID
- **Response**: Success message or 404 error

### 3. Response Format
All API responses should follow this consistent format:

```json
{
  "success": boolean,
  "data": object|array,
  "message": "string",
  "pagination": { // For list endpoints
    "currentPage": number,
    "totalPages": number,
    "totalCount": number,
    "hasNext": boolean,
    "hasPrev": boolean
  },
  "errors": [ // For validation errors
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

### 4. HTTP Status Codes
- **200 OK**: Successful GET, PUT, DELETE
- **201 Created**: Successful POST
- **400 Bad Request**: Validation errors, malformed requests
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors

## Non-Functional Requirements

### 1. Performance
- API should respond within 500ms for single record operations
- Support pagination for large datasets
- Efficient filtering and sorting capabilities

### 2. Security
- Input validation for all endpoints
- CORS enabled for cross-origin requests
- Helmet.js for security headers
- Request logging with Morgan

### 3. Error Handling
- Consistent error response format
- Proper HTTP status codes
- Detailed validation error messages
- Graceful handling of server errors

### 4. Testing
- Unit tests for all endpoints
- Validation testing
- Error scenario testing
- Minimum 90% code coverage

### 5. Documentation
- API endpoint documentation
- Setup and installation instructions
- Usage examples with CURL and Postman
- Code comments and inline documentation

## Technical Requirements

### 1. Technology Stack
- **Backend**: Node.js with Express.js framework
- **Database**: JSON Server for mock data persistence
- **Validation**: Joi for request validation
- **Testing**: Jest with Supertest for API testing
- **Logging**: Morgan for request logging
- **Security**: Helmet.js, CORS

### 2. Project Structure
```
Back-End-API/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── routes/
│   └── employees.js       # Employee route handlers
├── services/
│   └── employeeService.js # Business logic layer
├── validators/
│   └── employeeValidator.js # Input validation
├── middleware/
│   └── errorHandler.js    # Error handling middleware
└── tests/                 # Test files
    ├── employees.test.js
    ├── services.test.js
    ├── validators.test.js
    └── middleware.test.js

Json-Server/
├── package.json           # JSON Server dependencies
└── DataFolder/
    └── employees.json     # Employee seed data

CURL/
├── test-all-endpoints.sh  # Complete test script
├── individual-commands.md # Individual CURL commands
└── README.md             # CURL testing documentation

Postman/
├── Employee-REST-API.postman_collection.json
├── Employee-REST-API.postman_environment.json
└── README.md             # Postman usage instructions
```

### 3. Environment Configuration
- JSON Server runs on port 3001
- Express API runs on port 3000
- Configurable through environment variables

## Acceptance Criteria

### 1. API Functionality
- ✅ All CRUD operations working correctly
- ✅ Proper validation and error handling
- ✅ Pagination and filtering implemented
- ✅ Consistent response format

### 2. Testing
- ✅ Comprehensive unit test suite
- ✅ All endpoints tested with valid and invalid data
- ✅ Error scenarios covered
- ✅ CURL and Postman collections provided

### 3. Documentation
- ✅ Complete setup instructions
- ✅ API usage examples
- ✅ Code documentation
- ✅ Testing guidelines

### 4. Code Quality
- ✅ Clean, readable code structure
- ✅ Proper error handling
- ✅ Input validation
- ✅ Logging and monitoring capabilities

## Dependencies

### Backend API Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "morgan": "^1.10.0",
  "joi": "^17.11.0",
  "axios": "^1.6.0"
}
```

### Development Dependencies
```json
{
  "nodemon": "^3.0.1",
  "jest": "^29.7.0",
  "supertest": "^6.3.3"
}
```

### JSON Server Dependencies
```json
{
  "json-server": "^0.17.4"
}
```

## Constraints and Assumptions

### Constraints
- Must use JSON Server as the data persistence layer
- API must be RESTful
- All endpoints must return JSON responses
- Must include comprehensive testing

### Assumptions
- Single-user system (no authentication required)
- Employee IDs are auto-generated by JSON Server
- Data persistence is file-based through JSON Server
- Development environment setup on localhost