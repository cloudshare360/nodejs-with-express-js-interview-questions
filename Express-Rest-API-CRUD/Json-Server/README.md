# JSON Server - Employee Database

This directory contains the JSON Server setup that acts as a mock database for the Employee REST API.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server
```bash
npm start
```

The server will run on `http://localhost:3001`

## 📋 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | Start JSON Server | Production mode |
| `npm run dev` | Start JSON Server | Development mode (same as start) |
| `npm test` | Run test suite | Test all endpoints |
| `npm run test:simple` | Quick test | Simple GET request test |
| `npm run health` | Health check | Check if server is running |
| `npm run reset` | Reset data | Restore original employee data |

## 📊 Data Structure

### Employee Schema
```json
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
```

### Seed Data
The `DataFolder/employees.json` file contains 5 sample employees with various departments:
- Engineering
- Marketing  
- Sales
- HR
- Finance

## 🔗 API Endpoints

JSON Server automatically creates these REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PUT | `/employees/:id` | Update employee (full) |
| PATCH | `/employees/:id` | Update employee (partial) |
| DELETE | `/employees/:id` | Delete employee |

### Query Parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `_page` & `_limit` | `?_page=1&_limit=3` | Pagination |
| `_sort` & `_order` | `?_sort=salary&_order=desc` | Sorting |
| `q` | `?q=John` | Full-text search |
| Field filters | `?department=Engineering` | Filter by field |
| `_start` & `_end` | `?_start=0&_end=5` | Range |

## 🧪 Testing JSON Server

### Automated Testing
Run the complete test suite:
```bash
npm test
```

### Manual Testing

#### Basic Operations
```bash
# Get all employees
curl http://localhost:3001/employees

# Get specific employee
curl http://localhost:3001/employees/1

# Create employee
curl -X POST http://localhost:3001/employees \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","lastName":"Cooper","email":"alice@company.com","phone":"+1-555-0199","department":"Engineering","position":"Developer","salary":75000,"hireDate":"2024-01-15","status":"active"}'
```

#### Query Examples
```bash
# Pagination
curl "http://localhost:3001/employees?_page=1&_limit=2"

# Filter by department
curl "http://localhost:3001/employees?department=Engineering"

# Sort by salary
curl "http://localhost:3001/employees?_sort=salary&_order=desc"

# Search
curl "http://localhost:3001/employees?q=John"
```

## 📁 File Structure

```
Json-Server/
├── package.json              # Dependencies and scripts
├── test-json-server.sh       # Automated test script
├── README.md                 # This file
└── DataFolder/
    └── employees.json        # Employee data (database)
```

## 🔧 Configuration

### Default Settings
- **Port**: 3001
- **Host**: 0.0.0.0 (accessible from any IP)
- **Watch**: Enabled (auto-reload on file changes)
- **CORS**: Enabled

### Custom Configuration
You can customize JSON Server by creating:

#### `routes.json` (Optional)
```json
{
  "/api/*": "/$1"
}
```

#### `middleware.js` (Optional)
```javascript
module.exports = (req, res, next) => {
  res.header('X-API-Version', '1.0.0');
  next();
};
```

## 🔍 Monitoring

### Server Output
When running, JSON Server shows:
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

### Health Check
```bash
# Quick health check
npm run health

# Or manually
curl http://localhost:3001
```

## 🛠️ Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

#### JSON Syntax Error
```bash
# Validate JSON
cat DataFolder/employees.json | python -m json.tool
```

#### File Permissions
```bash
# Fix permissions
chmod 644 DataFolder/employees.json
chmod +x test-json-server.sh
```

#### Reset Data
```bash
# Restore original data
npm run reset
```

## 📈 Features

### Automatic Features
- ✅ Full REST API from JSON file
- ✅ CORS enabled
- ✅ File watching (auto-reload)
- ✅ Pagination support
- ✅ Filtering and sorting
- ✅ Search functionality
- ✅ Data persistence

### Response Headers
- `X-Total-Count`: Total number of resources
- `Link`: Pagination links
- `Access-Control-*`: CORS headers

## ⚠️ Important Notes

- **Development Only**: JSON Server is for development and testing
- **Data Persistence**: Changes are saved to the JSON file
- **File Watching**: Server automatically reloads when JSON file changes
- **Backup**: Consider backing up your data before testing

## 🔄 Integration

The Express API connects to JSON Server:
```javascript
const JSON_SERVER_URL = 'http://localhost:3001';
const response = await axios.get(`${JSON_SERVER_URL}/employees`);
```

This allows the Express API to:
- Add validation layer
- Transform responses
- Add business logic
- Implement security
- Add authentication

## 📚 Resources

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [REST API Guide](../Documentation/HOW-TO-RUN.md)
- [Express API Integration](../Back-End-API/README.md)