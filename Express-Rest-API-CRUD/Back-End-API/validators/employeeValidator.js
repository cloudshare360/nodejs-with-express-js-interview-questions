const Joi = require('joi');

const employeeSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name must not exceed 50 characters'
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name must not exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address'
  }),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).required().messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone number must be a valid format'
  }),
  department: Joi.string().valid('Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations').required().messages({
    'string.empty': 'Department is required',
    'any.only': 'Department must be one of: Engineering, Marketing, Sales, HR, Finance, Operations'
  }),
  position: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Position is required',
    'string.min': 'Position must be at least 2 characters long',
    'string.max': 'Position must not exceed 100 characters'
  }),
  salary: Joi.number().positive().required().messages({
    'number.base': 'Salary must be a number',
    'number.positive': 'Salary must be a positive number',
    'any.required': 'Salary is required'
  }),
  hireDate: Joi.date().iso().required().messages({
    'date.base': 'Hire date must be a valid date',
    'date.format': 'Hire date must be in ISO format (YYYY-MM-DD)',
    'any.required': 'Hire date is required'
  }),
  status: Joi.string().valid('active', 'inactive', 'terminated').default('active').messages({
    'any.only': 'Status must be one of: active, inactive, terminated'
  })
});

const employeeUpdateSchema = employeeSchema.fork(
  ['firstName', 'lastName', 'email', 'phone', 'department', 'position', 'salary', 'hireDate'],
  (schema) => schema.optional()
);

const validateEmployee = (req, res, next) => {
  const { error } = employeeSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

const validateEmployeeUpdate = (req, res, next) => {
  const { error } = employeeUpdateSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

module.exports = {
  employeeSchema,
  employeeUpdateSchema,
  validateEmployee,
  validateEmployeeUpdate
};