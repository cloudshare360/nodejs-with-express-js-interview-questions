const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const employeeRoutes = require('./routes/employees');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

// Security and CORS middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request timeout middleware
app.use((req, res, next) => {
  res.setTimeout(30000, () => {
    res.status(408).json({
      success: false,
      message: 'Request timeout'
    });
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Documentation endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Employee REST API',
    version: '1.0.0',
    description: 'A comprehensive REST API for Employee Management System',
    author: 'Developer',
    documentation: {
      endpoints: {
        'GET /': 'API information and documentation',
        'GET /health': 'Health check endpoint',
        'GET /api/employees': 'Get all employees (supports pagination and filtering)',
        'GET /api/employees/:id': 'Get employee by ID',
        'POST /api/employees': 'Create new employee',
        'PUT /api/employees/:id': 'Update employee by ID (supports partial updates)',
        'DELETE /api/employees/:id': 'Delete employee by ID'
      },
      queryParameters: {
        'page': 'Page number for pagination (default: 1)',
        'limit': 'Number of records per page (default: 10)',
        'department': 'Filter by department (Engineering, Marketing, Sales, HR, Finance, Operations)',
        'status': 'Filter by status (active, inactive, terminated)'
      },
      responseFormat: {
        success: 'boolean',
        data: 'object|array',
        message: 'string',
        pagination: 'object (for list endpoints)',
        errors: 'array (for validation errors)'
      }
    },
    dependencies: {
      jsonServer: JSON_SERVER_URL,
      nodeVersion: process.version,
      platform: process.platform
    }
  });
});

app.use('/api/employees', employeeRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 Employee REST API Server Started');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 API Documentation: http://localhost:${PORT}`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔗 JSON Server: ${JSON_SERVER_URL}`);
  console.log(`🏃 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('📊 Available endpoints:');
  console.log('   GET    /api/employees     - Get all employees');
  console.log('   GET    /api/employees/:id - Get employee by ID');
  console.log('   POST   /api/employees     - Create new employee');
  console.log('   PUT    /api/employees/:id - Update employee');
  console.log('   DELETE /api/employees/:id - Delete employee');
  console.log('===============================================');
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed.');
    console.log('👋 Process terminated gracefully.');
    process.exit(0);
  });

  // Force close after 30 seconds
  setTimeout(() => {
    console.error('⚠️  Forced shutdown after 30 seconds');
    process.exit(1);
  }, 30000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = { app, server };