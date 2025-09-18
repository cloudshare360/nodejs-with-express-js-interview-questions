# Employee REST API - Setup Guide

## Prerequisites

Before setting up the Employee REST API, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher)
- **npm** (Node Package Manager)
- **Git** (for version control)
- **curl** (for API testing) - usually pre-installed on most systems
- **Postman** (optional, for GUI-based API testing)

### Verify Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check curl availability
curl --version

# Check git availability
git --version
```

## Project Setup

### 1. Clone or Download the Project

If you have the project in a Git repository:
```bash
git clone <repository-url>
cd Express-Rest-API-CRUD
```

If you have downloaded the project as a ZIP file, extract it and navigate to the project directory.

### 2. Install JSON Server Dependencies

Navigate to the JSON Server directory and install dependencies:

```bash
cd Json-Server
npm install
```

This will install:
- `json-server`: Mock REST API server

### 3. Install Backend API Dependencies

Navigate to the Backend API directory and install dependencies:

```bash
cd ../Back-End-API
npm install
```

This will install production dependencies:
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `helmet`: Security middleware
- `morgan`: Request logging
- `joi`: Data validation
- `axios`: HTTP client

And development dependencies:
- `nodemon`: Development server with auto-restart
- `jest`: Testing framework
- `supertest`: HTTP testing library

## Configuration

### 1. Environment Variables (Optional)

You can create environment configuration files if needed:

#### Backend API (.env file in Back-End-API directory):
```env
PORT=3000
JSON_SERVER_URL=http://localhost:3001
NODE_ENV=development
```

#### JSON Server (.env file in Json-Server directory):
```env
PORT=3001
HOST=0.0.0.0
```

### 2. Verify Data Files

Ensure the employee seed data file exists:
```bash
ls Json-Server/DataFolder/employees.json
```

The file should contain initial employee data.

## Directory Structure Verification

After setup, your project structure should look like this:

```
Express-Rest-API-CRUD/
├── Back-End-API/
│   ├── node_modules/
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── middleware/
│   └── tests/
├── Json-Server/
│   ├── node_modules/
│   ├── package.json
│   └── DataFolder/
│       └── employees.json
├── CURL/
│   ├── test-all-endpoints.sh
│   ├── individual-commands.md
│   └── README.md
├── Postman/
│   ├── Employee-REST-API.postman_collection.json
│   ├── Employee-REST-API.postman_environment.json
│   └── README.md
└── Documentation/
    ├── REQUIREMENTS.md
    ├── SETUP.md
    └── HOW-TO-RUN.md
```

## Network Configuration

### Port Usage
- **JSON Server**: Port 3001
- **Express API**: Port 3000

### Firewall Configuration
If you're running on a server or using Docker, ensure these ports are accessible:

```bash
# Check if ports are available
netstat -an | grep :3000
netstat -an | grep :3001
```

## Docker Setup (Optional)

If you prefer to run the application in Docker containers:

### 1. Create Dockerfile for JSON Server

Create `Json-Server/Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### 2. Create Dockerfile for Backend API

Create `Back-End-API/Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Create Docker Compose File

Create `docker-compose.yml` in the root directory:
```yaml
version: '3.8'
services:
  json-server:
    build: ./Json-Server
    ports:
      - "3001:3001"
    volumes:
      - ./Json-Server/DataFolder:/app/DataFolder
  
  api-server:
    build: ./Back-End-API
    ports:
      - "3000:3000"
    depends_on:
      - json-server
    environment:
      - JSON_SERVER_URL=http://json-server:3001
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process (replace PID with actual process ID)
kill -9 <PID>
```

#### 2. Module Not Found Errors
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 3. Permission Issues (Linux/macOS)
```bash
# Fix permissions
sudo chown -R $USER:$USER .
chmod +x CURL/test-all-endpoints.sh
```

#### 4. JSON Server Data File Issues
```bash
# Verify JSON syntax
cat Json-Server/DataFolder/employees.json | python -m json.tool
```

#### 5. Network Connectivity Issues
```bash
# Test local connectivity
curl http://localhost:3001/employees
curl http://localhost:3000/
```

## Verification Steps

After setup, verify everything is working:

### 1. Check Package Installations
```bash
# In Json-Server directory
npm list --depth=0

# In Back-End-API directory
npm list --depth=0
```

### 2. Validate JSON Data
```bash
cd Json-Server/DataFolder
node -pe 'JSON.parse(require("fs").readFileSync("employees.json", "utf8"))'
```

### 3. Test Script Permissions
```bash
# Make CURL test script executable
chmod +x CURL/test-all-endpoints.sh
```

## Security Considerations

### 1. Development vs Production
- The current setup is for development
- For production, use a real database
- Implement authentication and authorization
- Use HTTPS
- Set up proper environment variable management

### 2. Data Security
- Employee data contains sensitive information
- Ensure proper access controls in production
- Consider data encryption for sensitive fields

## Next Steps

After completing the setup:

1. Read the [HOW-TO-RUN.md](./HOW-TO-RUN.md) guide to start the servers
2. Test the API using CURL commands or Postman
3. Run the test suite to verify everything works
4. Review the API documentation

## Support

If you encounter issues during setup:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed correctly
3. Ensure network ports are available
4. Check the console output for specific error messages
5. Review the project documentation for additional guidance