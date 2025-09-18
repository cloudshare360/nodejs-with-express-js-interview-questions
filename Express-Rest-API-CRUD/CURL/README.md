# Employee REST API - CURL Commands

This folder contains CURL commands to test all endpoints of the Employee REST API.

## Files

- `test-all-endpoints.sh` - Complete test suite with all CRUD operations
- `individual-commands.md` - Individual CURL commands for each endpoint

## Prerequisites

1. JSON Server must be running on port 3001
2. Express API must be running on port 3000

## Usage

### Run All Tests
```bash
chmod +x test-all-endpoints.sh
./test-all-endpoints.sh
```

### Individual Commands

See `individual-commands.md` for specific CURL commands that can be run individually.

## Test Data

The test suite includes:
- Valid employee creation
- Invalid data validation testing
- Update operations (full and partial)
- Delete operations
- Error handling (404, validation errors)
- Pagination and filtering

## Expected Responses

All API responses follow this format:
```json
{
  "success": true/false,
  "data": {...},
  "message": "Description of operation",
  "pagination": {...} // For list operations
}
```