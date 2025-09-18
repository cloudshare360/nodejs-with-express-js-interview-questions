# Postman Collection for Employee REST API

This folder contains Postman collection and environment files for testing the Employee REST API.

## Files

- `Employee-REST-API.postman_collection.json` - Complete collection with all endpoints
- `Employee-REST-API.postman_environment.json` - Environment variables
- `test-data.md` - Additional test data examples

## Import Instructions

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Select `Employee-REST-API.postman_collection.json`
4. Click "Import"

### 2. Import Environment
1. Click on the environment dropdown (top right)
2. Click "Import"
3. Select `Employee-REST-API.postman_environment.json`
4. Click "Import"
5. Select the "Employee REST API Environment" from the dropdown

## Collection Structure

### API Info
- Get API Information

### Employees Folder
- **Read Operations**
  - Get All Employees
  - Get All Employees with Pagination
  - Get Employees by Department
  - Get Employees by Status
  - Get Employee by ID
  - Get Employee by Non-existent ID (for error testing)

- **Create Operations**
  - Create New Employee
  - Create Employee with Invalid Data (for validation testing)

- **Update Operations**
  - Update Employee (Full)
  - Update Employee (Partial)
  - Update Non-existent Employee (for error testing)

- **Delete Operations**
  - Delete Employee
  - Delete Non-existent Employee (for error testing)

## Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `baseUrl` | `http://localhost:3000` | Base URL for the Express API |
| `apiUrl` | `{{baseUrl}}/api/employees` | Full API URL for employee endpoints |
| `jsonServerUrl` | `http://localhost:3001` | JSON Server URL |

## Prerequisites

1. JSON Server must be running on port 3001
2. Express API must be running on port 3000

## Test Data Included

The collection includes various test scenarios:
- Valid employee creation with complete data
- Invalid data validation testing
- Full and partial update operations
- Error handling (404, validation errors)
- Pagination and filtering tests

## Running Tests

1. Ensure both servers are running
2. Select the "Employee REST API Environment"
3. Run individual requests or use "Run Collection" to execute all tests
4. Check the response status codes and data

## Expected Responses

All responses follow this format:
```json
{
  "success": true/false,
  "data": {...},
  "message": "Description of operation",
  "pagination": {...}, // For list operations
  "errors": [...] // For validation errors
}
```

## Test Scenarios Covered

- ✅ CRUD Operations (Create, Read, Update, Delete)
- ✅ Validation Testing
- ✅ Error Handling
- ✅ Pagination
- ✅ Filtering by Department and Status
- ✅ Non-existent Resource Handling