#!/bin/bash

# JSON Server Test Script
# This script tests all JSON Server endpoints to ensure it's working correctly

echo "=== JSON Server Test Suite ==="
echo "Testing JSON Server at http://localhost:3001"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to test endpoint
test_endpoint() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4
    
    echo -n "Testing: $description ... "
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "%{http_code}" -X $method "$url" -H "Content-Type: application/json" -d "$data")
    else
        response=$(curl -s -w "%{http_code}" -X $method "$url")
    fi
    
    http_code="${response: -3}"
    response_body="${response%???}"
    
    if [[ "$http_code" =~ ^[2][0-9][0-9]$ ]]; then
        echo -e "${GREEN}PASS${NC} (HTTP $http_code)"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}FAIL${NC} (HTTP $http_code)"
        echo "Response: $response_body"
        ((TESTS_FAILED++))
    fi
}

echo "1. Testing JSON Server Health"
test_endpoint "GET" "http://localhost:3001" "" "JSON Server homepage"

echo ""
echo "2. Testing Employee CRUD Operations"

# Test GET all employees
test_endpoint "GET" "http://localhost:3001/employees" "" "Get all employees"

# Test GET single employee
test_endpoint "GET" "http://localhost:3001/employees/1" "" "Get employee by ID"

# Test POST create employee
NEW_EMPLOYEE='{
  "firstName": "Test",
  "lastName": "User",
  "email": "test.user@company.com",
  "phone": "+1-555-0199",
  "department": "HR",
  "position": "HR Assistant",
  "salary": 45000,
  "hireDate": "2024-01-15",
  "status": "active"
}'

test_endpoint "POST" "http://localhost:3001/employees" "$NEW_EMPLOYEE" "Create new employee"

# Get the ID of the created employee (assuming it's the last one)
CREATED_ID=$(curl -s "http://localhost:3001/employees" | grep -o '"id":[0-9]*' | tail -1 | grep -o '[0-9]*')

if [ -n "$CREATED_ID" ]; then
    echo "Created employee ID: $CREATED_ID"
    
    # Test PUT update employee
    UPDATE_EMPLOYEE='{
      "firstName": "Test Updated",
      "lastName": "User Updated",
      "email": "test.updated@company.com",
      "phone": "+1-555-0199",
      "department": "HR",
      "position": "Senior HR Assistant",
      "salary": 50000,
      "hireDate": "2024-01-15",
      "status": "active"
    }'
    
    test_endpoint "PUT" "http://localhost:3001/employees/$CREATED_ID" "$UPDATE_EMPLOYEE" "Update employee (full)"
    
    # Test PATCH update employee
    PATCH_EMPLOYEE='{"salary": 55000, "position": "HR Manager"}'
    test_endpoint "PATCH" "http://localhost:3001/employees/$CREATED_ID" "$PATCH_EMPLOYEE" "Update employee (partial)"
    
    # Test DELETE employee
    test_endpoint "DELETE" "http://localhost:3001/employees/$CREATED_ID" "" "Delete employee"
fi

echo ""
echo "3. Testing Query Parameters"

# Test pagination
test_endpoint "GET" "http://localhost:3001/employees?_page=1&_limit=2" "" "Pagination (page=1, limit=2)"

# Test filtering
test_endpoint "GET" "http://localhost:3001/employees?department=Engineering" "" "Filter by department"

# Test sorting
test_endpoint "GET" "http://localhost:3001/employees?_sort=salary&_order=desc" "" "Sort by salary (descending)"

# Test search
test_endpoint "GET" "http://localhost:3001/employees?q=John" "" "Search for 'John'"

echo ""
echo "4. Testing Error Cases"

# Test non-existent employee
test_endpoint "GET" "http://localhost:3001/employees/999" "" "Get non-existent employee (should return 404)"

# Test invalid JSON
test_endpoint "POST" "http://localhost:3001/employees" '{"invalid": json}' "Invalid JSON (should return 400)"

echo ""
echo "=== Test Results ==="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed! JSON Server is working correctly.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please check JSON Server configuration.${NC}"
    exit 1
fi