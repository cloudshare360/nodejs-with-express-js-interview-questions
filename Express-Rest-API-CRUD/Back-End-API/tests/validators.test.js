const { validateEmployee, validateEmployeeUpdate } = require('../validators/employeeValidator');

describe('Employee Validator', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('validateEmployee', () => {
    const validEmployeeData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1-555-0101',
      department: 'Engineering',
      position: 'Software Engineer',
      salary: 75000,
      hireDate: '2024-01-15',
      status: 'active'
    };

    it('should pass validation with valid data', () => {
      req.body = validEmployeeData;
      
      validateEmployee(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should reject missing firstName', () => {
      const { firstName, ...dataWithoutFirstName } = validEmployeeData;
      req.body = dataWithoutFirstName;
      
      validateEmployee(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'firstName',
              message: expect.stringContaining('required')
            })
          ])
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject invalid email format', () => {
      req.body = {
        ...validEmployeeData,
        email: 'invalid-email'
      };
      
      validateEmployee(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'email',
              message: expect.stringContaining('valid email')
            })
          ])
        })
      );
    });

    it('should reject negative salary', () => {
      req.body = {
        ...validEmployeeData,
        salary: -1000
      };
      
      validateEmployee(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'salary',
              message: expect.stringContaining('positive')
            })
          ])
        })
      );
    });

    it('should reject invalid department', () => {
      req.body = {
        ...validEmployeeData,
        department: 'InvalidDepartment'
      };
      
      validateEmployee(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'department',
              message: expect.stringContaining('Engineering, Marketing, Sales, HR, Finance, Operations')
            })
          ])
        })
      );
    });

    it('should reject invalid phone format', () => {
      req.body = {
        ...validEmployeeData,
        phone: 'invalid-phone'
      };
      
      validateEmployee(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'phone',
              message: expect.stringContaining('valid format')
            })
          ])
        })
      );
    });

    it('should reject invalid status', () => {
      req.body = {
        ...validEmployeeData,
        status: 'invalid-status'
      };
      
      validateEmployee(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'status',
              message: expect.stringContaining('active, inactive, terminated')
            })
          ])
        })
      );
    });

    it('should collect multiple validation errors', () => {
      req.body = {
        firstName: 'J', // Too short
        email: 'invalid-email',
        salary: -1000,
        department: 'InvalidDept'
      };
      
      validateEmployee(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({ field: 'firstName' }),
            expect.objectContaining({ field: 'email' }),
            expect.objectContaining({ field: 'salary' }),
            expect.objectContaining({ field: 'department' })
          ])
        })
      );
    });
  });

  describe('validateEmployeeUpdate', () => {
    it('should pass validation with partial valid data', () => {
      req.body = {
        firstName: 'John',
        salary: 85000
      };
      
      validateEmployeeUpdate(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should pass validation with empty body', () => {
      req.body = {};
      
      validateEmployeeUpdate(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should reject invalid partial data', () => {
      req.body = {
        email: 'invalid-email',
        salary: -1000
      };
      
      validateEmployeeUpdate(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Validation failed',
          errors: expect.arrayContaining([
            expect.objectContaining({ field: 'email' }),
            expect.objectContaining({ field: 'salary' })
          ])
        })
      );
    });
  });
});