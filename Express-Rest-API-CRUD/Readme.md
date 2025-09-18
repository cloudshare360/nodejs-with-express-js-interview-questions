# Employee REST API - Complete CRUD Application

A comprehensive REST API for Employee Management System built with Node.js, Express.js, and JSON Server. This project demonstrates complete CRUD operations with proper validation, testing, and documentation.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete employees
- **Input Validation**: Comprehensive validation using Joi
- **Error Handling**: Consistent error responses with proper HTTP status codes
- **Pagination & Filtering**: Support for pagination and filtering by department/status
- **Testing**: Complete unit test suite with Jest and Supertest
- **API Testing**: CURL commands and Postman collections included
- **Documentation**: Comprehensive setup and usage documentation

## 📁 Project Structure

```
Express-Rest-API-CRUD/
├── Back-End-API/              # Express.js REST API Server
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies and scripts
│   ├── routes/                # API route handlers
│   ├── services/              # Business logic layer
│   ├── validators/            # Input validation
│   ├── middleware/            # Custom middleware
│   └── tests/                 # Jest unit tests
├── Json-Server/               # Mock Database Server
│   ├── package.json           # JSON Server dependencies
│   └── DataFolder/            # JSON data files
│       └── employees.json     # Employee seed data
├── CURL/                      # API Testing with CURL
│   ├── test-all-endpoints.sh  # Complete test script
│   ├── individual-commands.md # Individual CURL commands
│   └── README.md              # CURL testing guide
├── Postman/                   # API Testing with Postman
│   ├── *.postman_collection.json   # Postman collection
│   ├── *.postman_environment.json  # Environment variables
│   └── README.md              # Postman usage guide
└── Documentation/             # Project Documentation
    ├── REQUIREMENTS.md        # Detailed requirements
    ├── SETUP.md              # Setup instructions
    └── HOW-TO-RUN.md         # Running guide
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JSON Server** - Mock REST API
- **Joi** - Data validation
- **Axios** - HTTP client

### Security & Middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - Request logging

### Testing
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation & Setup

1. **Install JSON Server Dependencies**
   ```bash
   cd Json-Server
   npm install
   ```

2. **Install Backend API Dependencies**
   ```bash
   cd ../Back-End-API
   npm install
   ```

3. **Start JSON Server** (Terminal 1)
   ```bash
   cd Json-Server
   npm start
   ```
   Server runs on: `http://localhost:3001`

4. **Start Express API** (Terminal 2)
   ```bash
   cd Back-End-API
   npm start
   ```
   Server runs on: `http://localhost:3000`

5. **Test the API**
   ```bash
   curl http://localhost:3000/api/employees
   ```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees (with pagination & filtering) |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Query Parameters
- `page` - Page number for pagination
- `limit` - Records per page
- `department` - Filter by department
- `status` - Filter by status

## 🧪 Testing

### Run Unit Tests
```bash
cd Back-End-API
npm test
```

### Test Coverage
```bash
cd Back-End-API
npm run test:coverage
```

### API Testing with CURL
```bash
cd CURL
chmod +x test-all-endpoints.sh
./test-all-endpoints.sh
```

### API Testing with Postman
1. Import `Postman/Employee-REST-API.postman_collection.json`
2. Import `Postman/Employee-REST-API.postman_environment.json`
3. Run the collection

## 📝 Employee Data Model

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

### Validation Rules
- **firstName/lastName**: 2-50 characters, required
- **email**: Valid email format, required
- **phone**: Valid phone format, required
- **department**: Engineering, Marketing, Sales, HR, Finance, Operations
- **position**: 2-100 characters, required
- **salary**: Positive number, required
- **hireDate**: ISO date format, required
- **status**: active, inactive, terminated (default: active)

## 📚 Documentation

- **[Requirements](Documentation/REQUIREMENTS.md)** - Detailed project requirements
- **[Setup Guide](Documentation/SETUP.md)** - Complete setup instructions
- **[How to Run](Documentation/HOW-TO-RUN.md)** - Running and testing guide
- **[CURL Testing](CURL/README.md)** - CURL command examples
- **[Postman Testing](Postman/README.md)** - Postman collection guide

## ✅ Features Implemented

- ✅ Complete CRUD operations for Employee management
- ✅ JSON Server as mock database with seed data
- ✅ Express.js REST API with proper routing
- ✅ Input validation with Joi
- ✅ Error handling middleware
- ✅ Request logging with Morgan
- ✅ Security headers with Helmet
- ✅ CORS support
- ✅ Pagination and filtering
- ✅ Comprehensive unit tests with Jest
- ✅ CURL test commands
- ✅ Postman collection and environment
- ✅ Complete documentation
- ✅ Setup and running instructions

## 🔧 Development

### Development Mode (Auto-restart)
```bash
# JSON Server
cd Json-Server
npm run dev

# Express API
cd Back-End-API
npm run dev
```

### Code Structure
- **Routes**: Handle HTTP requests and responses
- **Services**: Business logic and external API calls
- **Validators**: Input validation using Joi schemas
- **Middleware**: Error handling and request processing
- **Tests**: Unit tests for all components

## 🌟 Key Features

### Robust Error Handling
- Consistent error response format
- Proper HTTP status codes
- Detailed validation messages

### Comprehensive Testing
- Unit tests for all endpoints
- Validation testing
- Error scenario coverage
- Mock service testing

### Professional Documentation
- Complete API documentation
- Setup and deployment guides
- Testing instructions
- Code examples

### Production-Ready Structure
- Modular code organization
- Separation of concerns
- Security best practices
- Logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Learning Objectives

This project demonstrates:
- REST API design principles
- Express.js best practices
- Input validation and error handling
- Testing strategies for APIs
- API documentation
- Mock database integration
- Professional project structure

