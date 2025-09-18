#!/bin/bash

# Employee REST API - CURL Test Commands
# Make sure both JSON Server (port 3001) and Express API (port 3000) are running

BASE_URL="http://localhost:3000/api/employees"
CONTENT_TYPE="Content-Type: application/json"

echo "=== Employee REST API - CURL Test Commands ==="
echo "Base URL: $BASE_URL"
echo ""

# Test 1: Get API Info
echo "1. GET API Information"
echo "curl -X GET http://localhost:3000/"
curl -X GET http://localhost:3000/
echo -e "\n"

# Test 2: Get All Employees
echo "2. GET All Employees"
echo "curl -X GET \"$BASE_URL\""
curl -X GET "$BASE_URL"
echo -e "\n"

# Test 3: Get All Employees with Pagination
echo "3. GET All Employees with Pagination (page=1, limit=3)"
echo "curl -X GET \"$BASE_URL?page=1&limit=3\""
curl -X GET "$BASE_URL?page=1&limit=3"
echo -e "\n"

# Test 4: Get All Employees with Department Filter
echo "4. GET All Employees filtered by Department (Engineering)"
echo "curl -X GET \"$BASE_URL?department=Engineering\""
curl -X GET "$BASE_URL?department=Engineering"
echo -e "\n"

# Test 5: Get Employee by ID
echo "5. GET Employee by ID (ID: 1)"
echo "curl -X GET \"$BASE_URL/1\""
curl -X GET "$BASE_URL/1"
echo -e "\n"

# Test 6: Get Employee by Non-existent ID
echo "6. GET Employee by Non-existent ID (ID: 999)"
echo "curl -X GET \"$BASE_URL/999\""
curl -X GET "$BASE_URL/999"
echo -e "\n"

echo "=== CREATE OPERATIONS ==="

# Test 7: Create New Employee
echo "7. POST Create New Employee"
NEW_EMPLOYEE='{
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

echo "curl -X POST \"$BASE_URL\" \\"
echo "  -H \"$CONTENT_TYPE\" \\"
echo "  -d '$NEW_EMPLOYEE'"
curl -X POST "$BASE_URL" \
  -H "$CONTENT_TYPE" \
  -d "$NEW_EMPLOYEE"
echo -e "\n"

# Test 8: Create Employee with Invalid Data
echo "8. POST Create Employee with Invalid Data (missing required fields)"
INVALID_EMPLOYEE='{
  "firstName": "Bob",
  "email": "invalid-email",
  "salary": -1000
}'

echo "curl -X POST \"$BASE_URL\" \\"
echo "  -H \"$CONTENT_TYPE\" \\"
echo "  -d '$INVALID_EMPLOYEE'"
curl -X POST "$BASE_URL" \
  -H "$CONTENT_TYPE" \
  -d "$INVALID_EMPLOYEE"
echo -e "\n"

echo "=== UPDATE OPERATIONS ==="

# Test 9: Update Employee
echo "9. PUT Update Employee (ID: 1)"
UPDATE_EMPLOYEE='{
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

echo "curl -X PUT \"$BASE_URL/1\" \\"
echo "  -H \"$CONTENT_TYPE\" \\"
echo "  -d '$UPDATE_EMPLOYEE'"
curl -X PUT "$BASE_URL/1" \
  -H "$CONTENT_TYPE" \
  -d "$UPDATE_EMPLOYEE"
echo -e "\n"

# Test 10: Partial Update Employee
echo "10. PUT Partial Update Employee (ID: 2) - Only salary and position"
PARTIAL_UPDATE='{
  "position": "Senior Marketing Manager",
  "salary": 85000
}'

echo "curl -X PUT \"$BASE_URL/2\" \\"
echo "  -H \"$CONTENT_TYPE\" \\"
echo "  -d '$PARTIAL_UPDATE'"
curl -X PUT "$BASE_URL/2" \
  -H "$CONTENT_TYPE" \
  -d "$PARTIAL_UPDATE"
echo -e "\n"

# Test 11: Update Non-existent Employee
echo "11. PUT Update Non-existent Employee (ID: 999)"
echo "curl -X PUT \"$BASE_URL/999\" \\"
echo "  -H \"$CONTENT_TYPE\" \\"
echo "  -d '$UPDATE_EMPLOYEE'"
curl -X PUT "$BASE_URL/999" \
  -H "$CONTENT_TYPE" \
  -d "$UPDATE_EMPLOYEE"
echo -e "\n"

echo "=== DELETE OPERATIONS ==="

# Test 12: Delete Employee
echo "12. DELETE Employee (ID: 5)"
echo "curl -X DELETE \"$BASE_URL/5\""
curl -X DELETE "$BASE_URL/5"
echo -e "\n"

# Test 13: Delete Non-existent Employee
echo "13. DELETE Non-existent Employee (ID: 999)"
echo "curl -X DELETE \"$BASE_URL/999\""
curl -X DELETE "$BASE_URL/999"
echo -e "\n"

echo "=== VERIFICATION ==="

# Test 14: Verify Final State
echo "14. GET All Employees (Final State)"
echo "curl -X GET \"$BASE_URL\""
curl -X GET "$BASE_URL"
echo -e "\n"

echo "=== CURL Tests Completed ==="