const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');
const { validateEmployee, validateEmployeeUpdate } = require('../validators/employeeValidator');

// GET /api/employees - Get all employees
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, department, status } = req.query;
    const filters = {};
    
    if (department) filters.department = department;
    if (status) filters.status = status;
    
    const employees = await employeeService.getAllEmployees(filters, page, limit);
    
    res.json({
      success: true,
      data: employees.data,
      pagination: employees.pagination,
      message: 'Employees retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/employees/:id - Get employee by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.json({
      success: true,
      data: employee,
      message: 'Employee retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/employees - Create new employee
router.post('/', validateEmployee, async (req, res, next) => {
  try {
    const employeeData = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    
    res.status(201).json({
      success: true,
      data: newEmployee,
      message: 'Employee created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/employees/:id - Update employee by ID
router.put('/:id', validateEmployeeUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedEmployee = await employeeService.updateEmployee(id, updateData);
    
    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedEmployee,
      message: 'Employee updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/employees/:id - Delete employee by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await employeeService.deleteEmployee(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;