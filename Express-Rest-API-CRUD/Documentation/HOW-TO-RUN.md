# Employee REST API - How to Run

## Quick Start

Follow these steps to get the Employee REST API up and running:

### 1. Start JSON Server (Database)

JSON Server acts as our mock database. It creates a full REST API from the JSON file.

#### Prerequisites for JSON Server:
- Node.js installed
- Dependencies installed (`npm install` in Json-Server directory)

#### Starting JSON Server:

**Step 1**: Open a terminal and navigate to the JSON Server directory:
```bash
cd Json-Server
```

**Step 2**: Install dependencies (if not already done):
```bash
npm install
```

**Step 3**: Start the JSON Server:
```bash
npm start
```

You should see output similar to:
```
\{^_^}/ hi!

Loading Json-Server/DataFolder/employees.json
Done

Resources
http://localhost:3001/employees

Home
http://localhost:3001

Type s + enter at any time to create a snapshot of the database
```

#### What JSON Server provides:
- **REST API**: Full CRUD operations on `http://localhost:3001/employees`
- **Auto-save**: Changes are automatically saved to the JSON file
- **File watching**: Automatically reloads when JSON file changes
- **CORS enabled**: Can be accessed from any origin

#### Verify JSON Server is working:
```bash
# Test if server is running
curl http://localhost:3001

# Test employee endpoint
curl http://localhost:3001/employees

# Test specific employee
curl http://localhost:3001/employees/1
```

**⚠️ Keep this terminal window open** - JSON Server must remain running for the Express API to work.

### 2. Start Express API Server

Open a **new terminal window** and navigate to the Backend API directory:

```bash
cd Back-End-API
npm start
```

You should see output similar to:
```
Server is running on port 3000
API Documentation: http://localhost:3000
```

**Keep this terminal window open** - The API server must remain running.

### 3. Verify Setup

Open a third terminal window and test the setup:

```bash
# Test JSON Server
curl http://localhost:3001/employees

# Test Express API
curl http://localhost:3000/
```

Both commands should return JSON responses without errors.

## Alternative Running Methods

### Development Mode (Auto-restart)

For development with automatic server restart on file changes:

#### JSON Server:
```bash
cd Json-Server
npm run dev
```

#### Express API:
```bash
cd Back-End-API
npm run dev
```

### Docker (Optional)

If you have Docker setup configured:

```bash
# From project root
docker-compose up
```

## API Testing

### Using CURL

#### Run Complete Test Suite:
```bash
cd CURL
chmod +x test-all-endpoints.sh
./test-all-endpoints.sh
```

#### Run Individual Commands:
See `CURL/individual-commands.md` for specific examples.

### Using Postman

1. Open Postman
2. Import `Postman/Employee-REST-API.postman_collection.json`
3. Import `Postman/Employee-REST-API.postman_environment.json`
4. Select the "Employee REST API Environment"
5. Run individual requests or the entire collection

## Running Tests

### Unit Tests

Run the Jest test suite:

```bash
cd Back-End-API
npm test
```

### Test Coverage

Generate test coverage report:

```bash
cd Back-End-API
npm run test:coverage
```

### Watch Mode (Development)

Run tests in watch mode during development:

```bash
cd Back-End-API
npm run test:watch
```

## API Endpoints Overview

Once both servers are running, the following endpoints are available:

### Base URLs
- **JSON Server**: `http://localhost:3001`
- **Express API**: `http://localhost:3000`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees?page=1&limit=5` | Get employees with pagination |
| GET | `/api/employees?department=Engineering` | Filter by department |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Example API Calls

#### Get All Employees:
```bash
curl http://localhost:3000/api/employees
```

#### Get Employee by ID:
```bash
curl http://localhost:3000/api/employees/1
```

#### Create New Employee:
```bash
curl -X POST http://localhost:3000/api/employees \
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

## Monitoring and Logs

### Server Logs

Both servers provide console output for monitoring:

- **JSON Server**: Shows HTTP requests and responses
- **Express API**: Uses Morgan for request logging

### Request Logging

The Express API logs all requests in the format:
```
GET /api/employees 200 15.234 ms - 1547
```

### Error Logging

Errors are logged to the console with full stack traces in development mode.

## Development Workflow

### 1. Making Changes

#### Backend API Changes:
1. Modify files in `Back-End-API/`
2. If using `npm run dev`, server auto-restarts
3. If using `npm start`, restart manually with Ctrl+C and `npm start`

#### Data Changes:
1. Modify `Json-Server/DataFolder/employees.json`
2. Changes are automatically reflected (JSON Server watches the file)

### 2. Testing Changes

```bash
# Run unit tests
cd Back-End-API
npm test

# Test specific endpoint
curl http://localhost:3000/api/employees

# Run full CURL test suite
cd CURL
./test-all-endpoints.sh
```

## Stopping the Servers

To stop the servers:

1. **JSON Server**: Press `Ctrl+C` in the JSON Server terminal
2. **Express API**: Press `Ctrl+C` in the API server terminal

## Troubleshooting

### Server Won't Start

#### Port Already in Use:
```bash
# Find process using port
lsof -i :3000  # for API server
lsof -i :3001  # for JSON server

# Kill process
kill -9 <PID>
```

#### Missing Dependencies:
```bash
# Reinstall dependencies
cd Back-End-API
rm -rf node_modules
npm install

cd ../Json-Server
rm -rf node_modules
npm install
```

### API Errors

#### 404 Errors:
- Verify both servers are running
- Check the correct port numbers
- Ensure proper URL paths

#### 500 Errors:
- Check server console logs
- Verify JSON Server is accessible
- Check data file integrity

#### Validation Errors:
- Review request data format
- Check required fields
- Verify data types match schema

### Connection Issues

#### Can't Connect to JSON Server:
```bash
# Test JSON Server directly
curl http://localhost:3001/employees

# Check if JSON Server is running
ps aux | grep json-server
```

#### Can't Connect to Express API:
```bash
# Test Express API health
curl http://localhost:3000/

# Check if Express server is running
ps aux | grep node
```

## Performance Monitoring

### Response Times

Monitor API response times through:
- Server console logs (Morgan logging)
- Browser Developer Tools
- Postman response time display

### Memory Usage

Monitor server memory usage:
```bash
# Check Node.js processes
ps aux | grep node

# Monitor in real-time
top -p <PID>
```

## Production Considerations

**Note**: This setup is for development only. For production:

1. Use a real database (MongoDB, PostgreSQL, etc.)
2. Implement authentication and authorization
3. Add input sanitization
4. Use HTTPS
5. Add rate limiting
6. Implement proper logging
7. Add monitoring and alerting
8. Use process managers (PM2, etc.)

## Next Steps

After successfully running the application:

1. Explore the API using different CURL commands
2. Import and test the Postman collection
3. Review the test suite results
4. Examine the code structure
5. Modify employee data and test the changes
6. Add new features or extend existing functionality

## Additional Resources

- **API Documentation**: Available at `http://localhost:3000/`
- **CURL Examples**: See `CURL/individual-commands.md`
- **Postman Collection**: See `Postman/README.md`
- **Test Documentation**: Review test files in `Back-End-API/tests/`