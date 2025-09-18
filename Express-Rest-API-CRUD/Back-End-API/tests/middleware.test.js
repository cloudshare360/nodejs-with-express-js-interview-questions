const { errorHandler, notFound } = require('../middleware/errorHandler');

describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { originalUrl: '/test-url' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    
    // Mock console.error to prevent test output pollution
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('notFound middleware', () => {
    it('should create 404 error and call next', () => {
      notFound(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Not found - /test-url'
        })
      );
    });
  });

  describe('errorHandler middleware', () => {
    it('should handle default errors', () => {
      const error = new Error('Test error');
      
      errorHandler(error, req, res, next);

      expect(console.error).toHaveBeenCalledWith(error.stack);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Test error'
      });
    });

    it('should handle errors with custom status', () => {
      const error = new Error('Custom error');
      error.status = 400;
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Custom error'
      });
    });

    it('should handle validation errors', () => {
      const error = {
        name: 'ValidationError',
        errors: {
          field1: { message: 'Field 1 error' },
          field2: { message: 'Field 2 error' }
        }
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Validation Error: Field 1 error, Field 2 error'
      });
    });

    it('should handle MongoDB duplicate key errors', () => {
      const error = {
        name: 'MongoError',
        code: 11000
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Duplicate field value entered'
      });
    });

    it('should handle MongoDB cast errors', () => {
      const error = {
        name: 'CastError'
      };
      
      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Resource not found'
      });
    });

    it('should include stack trace in development environment', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const error = new Error('Test error');
      error.stack = 'Error stack trace';
      
      errorHandler(error, req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Test error',
        stack: 'Error stack trace'
      });
      
      process.env.NODE_ENV = originalEnv;
    });

    it('should not include stack trace in production environment', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const error = new Error('Test error');
      error.stack = 'Error stack trace';
      
      errorHandler(error, req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Test error'
      });
      
      process.env.NODE_ENV = originalEnv;
    });
  });
});