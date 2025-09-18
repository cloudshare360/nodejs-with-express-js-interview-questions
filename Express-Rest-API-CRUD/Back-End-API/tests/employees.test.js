const request = require('supertest');
const { app, server } = require('../server');
const employeeService = require('../services/employeeService');

// Mock the employee service
jest.mock('../services/employeeService');

describe('Employee REST API', () => {
  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Employee REST API');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /api/employees', () => {
    it('should return all employees with success response', async () => {
      const mockEmployees = {
        data: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@company.com',
            department: 'Engineering'
          }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalCount: 1,
          hasNext: false,
          hasPrev: false
        }
      };

      employeeService.getAllEmployees.mockResolvedValue(mockEmployees);

      const response = await request(app).get('/api/employees');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockEmployees.data);
      expect(response.body.pagination).toEqual(mockEmployees.pagination);
      expect(response.body.message).toBe('Employees retrieved successfully');
    });

    it('should handle pagination parameters', async () => {
      const mockEmployees = {
        data: [],
        pagination: {
          currentPage: 2,
          totalPages: 3,
          totalCount: 15,
          hasNext: true,
          hasPrev: true
        }
      };

      employeeService.getAllEmployees.mockResolvedValue(mockEmployees);

      const response = await request(app)
        .get('/api/employees')
        .query({ page: 2, limit: 5 });

      expect(response.status).toBe(200);
      expect(employeeService.getAllEmployees).toHaveBeenCalledWith({}, '2', '5');
    });

    it('should handle filtering parameters', async () => {
      const mockEmployees = {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
          hasNext: false,
          hasPrev: false
        }
      };

      employeeService.getAllEmployees.mockResolvedValue(mockEmployees);

      const response = await request(app)
        .get('/api/employees')
        .query({ department: 'Engineering', status: 'active' });

      expect(response.status).toBe(200);
      expect(employeeService.getAllEmployees).toHaveBeenCalledWith(
        { department: 'Engineering', status: 'active' },
        '1',
        '10'
      );
    });

    it('should handle service errors', async () => {
      employeeService.getAllEmployees.mockRejectedValue(new Error('Service error'));

      const response = await request(app).get('/api/employees');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Service error');
    });
  });

  describe('GET /api/employees/:id', () => {
    it('should return employee by ID', async () => {
      const mockEmployee = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        department: 'Engineering'
      };

      employeeService.getEmployeeById.mockResolvedValue(mockEmployee);

      const response = await request(app).get('/api/employees/1');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockEmployee);
      expect(response.body.message).toBe('Employee retrieved successfully');
      expect(employeeService.getEmployeeById).toHaveBeenCalledWith('1');
    });

    it('should return 404 when employee not found', async () => {
      employeeService.getEmployeeById.mockResolvedValue(null);

      const response = await request(app).get('/api/employees/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Employee not found');
    });

    it('should handle service errors', async () => {
      employeeService.getEmployeeById.mockRejectedValue(new Error('Service error'));

      const response = await request(app).get('/api/employees/1');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Service error');
    });
  });

  describe('POST /api/employees', () => {
    const validEmployeeData = {
      firstName: 'Alice',
      lastName: 'Cooper',
      email: 'alice.cooper@company.com',
      phone: '+1-555-0106',
      department: 'Engineering',
      position: 'Software Developer',
      salary: 80000,
      hireDate: '2024-01-15',
      status: 'active'
    };

    it('should create new employee with valid data', async () => {
      const mockCreatedEmployee = { id: 6, ...validEmployeeData };
      employeeService.createEmployee.mockResolvedValue(mockCreatedEmployee);

      const response = await request(app)
        .post('/api/employees')
        .send(validEmployeeData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockCreatedEmployee);
      expect(response.body.message).toBe('Employee created successfully');
      expect(employeeService.createEmployee).toHaveBeenCalledWith(validEmployeeData);
    });

    it('should return validation error for missing required fields', async () => {
      const response = await request(app)
        .post('/api/employees')
        .send({
          firstName: 'Bob'
          // Missing required fields
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('should return validation error for invalid email', async () => {
      const response = await request(app)
        .post('/api/employees')
        .send({
          ...validEmployeeData,
          email: 'invalid-email'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
      expect(response.body.errors).toBeDefined();
    });

    it('should return validation error for negative salary', async () => {
      const response = await request(app)
        .post('/api/employees')
        .send({
          ...validEmployeeData,
          salary: -1000
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should return validation error for invalid department', async () => {
      const response = await request(app)
        .post('/api/employees')
        .send({
          ...validEmployeeData,
          department: 'InvalidDepartment'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should handle service errors', async () => {
      employeeService.createEmployee.mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .post('/api/employees')
        .send(validEmployeeData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Service error');
    });
  });

  describe('PUT /api/employees/:id', () => {
    const updateData = {
      firstName: 'John',
      lastName: 'Doe Updated',
      position: 'Senior Developer',
      salary: 95000
    };

    it('should update employee with valid data', async () => {
      const mockUpdatedEmployee = { id: 1, ...updateData };
      employeeService.updateEmployee.mockResolvedValue(mockUpdatedEmployee);

      const response = await request(app)
        .put('/api/employees/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockUpdatedEmployee);
      expect(response.body.message).toBe('Employee updated successfully');
      expect(employeeService.updateEmployee).toHaveBeenCalledWith('1', updateData);
    });

    it('should return 404 when employee not found', async () => {
      employeeService.updateEmployee.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/employees/999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Employee not found');
    });

    it('should return validation error for invalid update data', async () => {
      const response = await request(app)
        .put('/api/employees/1')
        .send({
          email: 'invalid-email',
          salary: -1000
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should handle service errors', async () => {
      employeeService.updateEmployee.mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .put('/api/employees/1')
        .send(updateData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Service error');
    });
  });

  describe('DELETE /api/employees/:id', () => {
    it('should delete employee successfully', async () => {
      employeeService.deleteEmployee.mockResolvedValue(true);

      const response = await request(app).delete('/api/employees/1');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Employee deleted successfully');
      expect(employeeService.deleteEmployee).toHaveBeenCalledWith('1');
    });

    it('should return 404 when employee not found', async () => {
      employeeService.deleteEmployee.mockResolvedValue(false);

      const response = await request(app).delete('/api/employees/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Employee not found');
    });

    it('should handle service errors', async () => {
      employeeService.deleteEmployee.mockRejectedValue(new Error('Service error'));

      const response = await request(app).delete('/api/employees/1');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Service error');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Not found');
    });
  });
});