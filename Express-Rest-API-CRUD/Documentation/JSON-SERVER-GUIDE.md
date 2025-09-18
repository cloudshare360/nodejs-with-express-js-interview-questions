# JSON Server Setup and Usage Guide

## What is JSON Server?

JSON Server is a simple and lightweight mock REST API server that creates a full REST API from a JSON file in seconds. It's perfect for prototyping, development, and testing without setting up a real database.

## 📁 Project Structure

```
Json-Server/
├── package.json           # Dependencies and scripts
├── server.js             # Optional custom server configuration
└── DataFolder/
    └── employees.json    # Employee data (acts as database)
```

## 🚀 Quick Start

### 1. Navigate to JSON Server Directory
```bash
cd Json-Server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start JSON Server
```bash
npm start
```

The server will start on `http://localhost:3001`

## 📦 Package.json Scripts

The `Json-Server/package.json` includes the following scripts:

```json
{
  "scripts": {
    "start": "json-server --watch DataFolder/employees.json --port 3001 --host 0.0.0.0",
    "dev": "json-server --watch DataFolder/employees.json --port 3001 --host 0.0.0.0"
  }
}
```

### Script Explanations:

- **`npm start`**: Starts JSON Server in production mode
- **`npm run dev`**: Starts JSON Server in development mode (same as start for JSON Server)

### Command Line Options:

- `--watch`: Automatically reload when JSON file changes
- `--port 3001`: Run server on port 3001
- `--host 0.0.0.0`: Allow connections from any IP address
- `--routes routes.json`: Custom routes (optional)
- `--middlewares middleware.js`: Custom middleware (optional)

## 📊 Data Structure

### Employee Data Model (`DataFolder/employees.json`):

```json
{
  "employees": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@company.com",
      "phone": "+1-555-0101",
      "department": "Engineering",
      "position": "Senior Software Engineer",
      "salary": 95000,
      "hireDate": "2020-03-15",
      "status": "active"
    }
  ]
}
```

## 🔧 Starting JSON Server

### Method 1: Using npm scripts (Recommended)
```bash
cd Json-Server
npm start
```

### Method 2: Direct command
```bash
cd Json-Server
npx json-server --watch DataFolder/employees.json --port 3001
```

### Method 3: Global installation
```bash
# Install globally (one time)
npm install -g json-server

# Run from Json-Server directory
json-server --watch DataFolder/employees.json --port 3001
```

## 🧪 Testing JSON Server

### 1. Basic Health Check
Test if JSON Server is running:
```bash
curl http://localhost:3001
```

Expected response: JSON Server homepage

### 2. Test Employee Endpoints

#### Get All Employees
```bash
curl http://localhost:3001/employees
```

#### Get Employee by ID
```bash
curl http://localhost:3001/employees/1
```

#### Create New Employee
```bash
curl -X POST http://localhost:3001/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@company.com",
    "phone": "+1-555-0199",
    "department": "Marketing",
    "position": "Marketing Specialist",
    "salary": 65000,
    "hireDate": "2024-01-15",
    "status": "active"
  }'
```

#### Update Employee
```bash
curl -X PUT http://localhost:3001/employees/1 \
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

#### Partial Update Employee
```bash
curl -X PATCH http://localhost:3001/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "salary": 110000,
    "position": "Senior Lead Engineer"
  }'
```

#### Delete Employee
```bash
curl -X DELETE http://localhost:3001/employees/1
```

### 3. Advanced Query Testing

#### Pagination
```bash
# Get first 3 employees
curl "http://localhost:3001/employees?_page=1&_limit=3"

# Get next 3 employees
curl "http://localhost:3001/employees?_page=2&_limit=3"
```

#### Filtering
```bash
# Filter by department
curl "http://localhost:3001/employees?department=Engineering"

# Filter by status
curl "http://localhost:3001/employees?status=active"

# Multiple filters
curl "http://localhost:3001/employees?department=Engineering&status=active"
```

#### Sorting
```bash
# Sort by salary (ascending)
curl "http://localhost:3001/employees?_sort=salary&_order=asc"

# Sort by hire date (descending)
curl "http://localhost:3001/employees?_sort=hireDate&_order=desc"
```

#### Search
```bash
# Search in any field
curl "http://localhost:3001/employees?q=John"

# Search by specific field
curl "http://localhost:3001/employees?firstName_like=John"
```

## 🔍 JSON Server Features

### Automatic REST API Generation
JSON Server automatically creates REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PUT | `/employees/:id` | Update employee (full) |
| PATCH | `/employees/:id` | Update employee (partial) |
| DELETE | `/employees/:id` | Delete employee |

### Query Parameters Support
- `_page` & `_limit`: Pagination
- `_sort` & `_order`: Sorting
- `_start` & `_end`: Slice
- `q`: Full-text search
- `field_like`: Field search
- `field_gte` / `field_lte`: Range queries

### Response Headers
JSON Server includes helpful headers:
- `X-Total-Count`: Total number of resources
- `Link`: Pagination links
- `Access-Control-*`: CORS headers

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Check what's using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or use different port
json-server --watch DataFolder/employees.json --port 3002
```

#### 2. JSON File Syntax Error
```bash
# Validate JSON syntax
cat DataFolder/employees.json | python -m json.tool

# Or use online JSON validator
```

#### 3. File Not Found
```bash
# Ensure you're in the correct directory
pwd
ls -la DataFolder/

# Create missing directory
mkdir -p DataFolder
```

#### 4. Permission Issues (Linux/macOS)
```bash
# Fix file permissions
chmod 644 DataFolder/employees.json
chmod 755 DataFolder/
```

## 📈 Monitoring JSON Server

### Server Logs
JSON Server provides detailed logging:
```
\{^_^}/ hi!

Loading DataFolder/employees.json
Done

Resources
http://localhost:3001/employees

Home
http://localhost:3001

Type s + enter at any time to create a snapshot of the database
```

### Real-time Data Changes
- JSON Server automatically saves changes to the JSON file
- File watching means changes are reflected immediately
- Use `s + Enter` to create snapshots

## 🔐 Security Considerations

### Development Only
⚠️ **Important**: JSON Server is for development only!

For production:
- Use a real database (MongoDB, PostgreSQL, MySQL)
- Implement proper authentication
- Add input validation
- Use HTTPS
- Implement rate limiting

### Basic Security Measures
```bash
# Run on localhost only (remove --host 0.0.0.0)
json-server --watch DataFolder/employees.json --port 3001

# Use custom routes for security
json-server --watch DataFolder/employees.json --routes routes.json
```

## 🚀 Advanced Configuration

### Custom Routes (Optional)
Create `routes.json` for custom URL mappings:
```json
{
  "/api/*": "/$1",
  "/employees/:id/details": "/employees/:id"
}
```

### Custom Middleware (Optional)
Create `middleware.js` for custom logic:
```javascript
module.exports = (req, res, next) => {
  // Add custom headers
  res.header('X-API-Version', '1.0.0');
  
  // Log requests
  console.log(`${req.method} ${req.path}`);
  
  next();
};
```

### Environment Configuration
Create `.env` file:
```env
PORT=3001
HOST=localhost
WATCH=true
```

## 📋 Testing Checklist

Before proceeding with the Express API, ensure:

- ✅ JSON Server starts without errors
- ✅ Can access `http://localhost:3001`
- ✅ Can retrieve all employees (`GET /employees`)
- ✅ Can retrieve single employee (`GET /employees/1`)
- ✅ Can create new employee (`POST /employees`)
- ✅ Can update employee (`PUT /employees/1`)
- ✅ Can delete employee (`DELETE /employees/1`)
- ✅ Pagination works (`?_page=1&_limit=3`)
- ✅ Filtering works (`?department=Engineering`)
- ✅ Data persists in JSON file

## 🔄 Integration with Express API

The Express API connects to JSON Server via HTTP requests:

```javascript
// Express API makes requests to JSON Server
const JSON_SERVER_URL = 'http://localhost:3001';
const response = await axios.get(`${JSON_SERVER_URL}/employees`);
```

This architecture allows:
- ✅ Separation of concerns
- ✅ Easy database switching later
- ✅ Independent testing of each layer
- ✅ Scalable architecture

## 📚 Additional Resources

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [JSON Server CLI Options](https://github.com/typicode/json-server#cli-usage)
- [Custom Routes Guide](https://github.com/typicode/json-server#add-custom-routes)
- [Middleware Guide](https://github.com/typicode/json-server#add-middlewares)