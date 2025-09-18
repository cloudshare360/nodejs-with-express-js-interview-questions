# Individual CURL Commands

## Base Configuration
```bash
BASE_URL="http://localhost:3000/api/employees"
CONTENT_TYPE="Content-Type: application/json"
```

## READ Operations

### 1. Get API Information
```bash
curl -X GET http://localhost:3000/
```

### 2. Get All Employees
```bash
curl -X GET "http://localhost:3000/api/employees"
```

### 3. Get All Employees with Pagination
```bash
curl -X GET "http://localhost:3000/api/employees?page=1&limit=3"
```

### 4. Get All Employees by Department
```bash
curl -X GET "http://localhost:3000/api/employees?department=Engineering"
```

### 5. Get All Employees by Status
```bash
curl -X GET "http://localhost:3000/api/employees?status=active"
```

### 6. Get Employee by ID
```bash
curl -X GET "http://localhost:3000/api/employees/1"
```

## CREATE Operations

### 7. Create New Employee
```bash
curl -X POST "http://localhost:3000/api/employees" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Cooper",
    "email": "alice.cooper@company.com",
    "phone": "+1-555-0106",
    "department": "Engineering",
    "position": "Software Developer",
    "salary": 80000,
    "hireDate": "2024-01-15",
    "status": "active"
  }'
```

### 8. Create Employee with Validation Error (for testing)
```bash
curl -X POST "http://localhost:3000/api/employees" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bob",
    "email": "invalid-email",
    "salary": -1000
  }'
```

## UPDATE Operations

### 9. Update Employee (Full Update)
```bash
curl -X PUT "http://localhost:3000/api/employees/1" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe.updated@company.com",
    "phone": "+1-555-0101",
    "department": "Engineering",
    "position": "Lead Software Engineer",
    "salary": 105000,
    "hireDate": "2020-03-15",
    "status": "active"
  }'
```

### 10. Update Employee (Partial Update)
```bash
curl -X PUT "http://localhost:3000/api/employees/2" \
  -H "Content-Type: application/json" \
  -d '{
    "position": "Senior Marketing Manager",
    "salary": 85000
  }'
```

## DELETE Operations

### 11. Delete Employee
```bash
curl -X DELETE "http://localhost:3000/api/employees/5"
```

### 12. Delete Non-existent Employee (for testing)
```bash
curl -X DELETE "http://localhost:3000/api/employees/999"
```

## Test Data for Creating Employees

### Valid Employee Data
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test.user@company.com",
  "phone": "+1-555-0199",
  "department": "HR",
  "position": "HR Assistant",
  "salary": 45000,
  "hireDate": "2024-02-01",
  "status": "active"
}
```

### Another Valid Employee
```json
{
  "firstName": "Maria",
  "lastName": "Garcia",
  "email": "maria.garcia@company.com",
  "phone": "+1-555-0200",
  "department": "Finance",
  "position": "Senior Accountant",
  "salary": 72000,
  "hireDate": "2023-08-15",
  "status": "active"
}
```

## Expected Status Codes

- **200 OK**: Successful GET, PUT
- **201 Created**: Successful POST
- **400 Bad Request**: Validation errors
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Response Format

All responses follow this structure:
```json
{
  "success": boolean,
  "data": object|array,
  "message": "string",
  "pagination": object, // For list endpoints
  "errors": array // For validation errors
}
```