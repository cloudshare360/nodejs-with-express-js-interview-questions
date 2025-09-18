const employeeService = require('../services/employeeService');
const axios = require('axios');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('Employee Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllEmployees', () => {
    it('should fetch all employees with default pagination', async () => {
      const mockData = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' }
      ];
      
      mockedAxios.get.mockResolvedValue({
        data: mockData,
        headers: { 'x-total-count': '2' }
      });

      const result = await employeeService.getAllEmployees();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:3001/employees?_page=1&_limit=10'
      );
      expect(result.data).toEqual(mockData);
      expect(result.pagination).toEqual({
        currentPage: 1,
        totalPages: 1,
        totalCount: 2,
        hasNext: false,
        hasPrev: false
      });
    });

    it('should apply filters and pagination', async () => {
      const mockData = [{ id: 1, firstName: 'John', department: 'Engineering' }];
      
      mockedAxios.get.mockResolvedValue({
        data: mockData,
        headers: { 'x-total-count': '1' }
      });

      const filters = { department: 'Engineering', status: 'active' };
      const result = await employeeService.getAllEmployees(filters, 2, 5);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:3001/employees?department=Engineering&status=active&_page=2&_limit=5'
      );
      expect(result.pagination.currentPage).toBe(2);
    });

    it('should handle axios errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(employeeService.getAllEmployees())
        .rejects.toThrow('Failed to fetch employees: Network error');
    });
  });

  describe('getEmployeeById', () => {
    it('should fetch employee by ID', async () => {
      const mockEmployee = { id: 1, firstName: 'John', lastName: 'Doe' };
      
      mockedAxios.get.mockResolvedValue({ data: mockEmployee });

      const result = await employeeService.getEmployeeById(1);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:3001/employees/1'
      );
      expect(result).toEqual(mockEmployee);
    });

    it('should return null for 404 errors', async () => {
      mockedAxios.get.mockRejectedValue({
        response: { status: 404 }
      });

      const result = await employeeService.getEmployeeById(999);

      expect(result).toBeNull();
    });

    it('should throw error for other axios errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(employeeService.getEmployeeById(1))
        .rejects.toThrow('Failed to fetch employee: Network error');
    });
  });

  describe('createEmployee', () => {
    it('should create new employee', async () => {
      const employeeData = {
        firstName: 'Alice',
        lastName: 'Cooper',
        email: 'alice@company.com'
      };
      const mockCreatedEmployee = { id: 6, ...employeeData };
      
      mockedAxios.post.mockResolvedValue({ data: mockCreatedEmployee });

      const result = await employeeService.createEmployee(employeeData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3001/employees',
        employeeData
      );
      expect(result).toEqual(mockCreatedEmployee);
    });

    it('should handle axios errors', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      await expect(employeeService.createEmployee({}))
        .rejects.toThrow('Failed to create employee: Network error');
    });
  });

  describe('updateEmployee', () => {
    it('should update employee', async () => {
      const updateData = { firstName: 'John Updated' };
      const mockUpdatedEmployee = { id: 1, ...updateData };
      
      mockedAxios.put.mockResolvedValue({ data: mockUpdatedEmployee });

      const result = await employeeService.updateEmployee(1, updateData);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        'http://localhost:3001/employees/1',
        updateData
      );
      expect(result).toEqual(mockUpdatedEmployee);
    });

    it('should return null for 404 errors', async () => {
      mockedAxios.put.mockRejectedValue({
        response: { status: 404 }
      });

      const result = await employeeService.updateEmployee(999, {});

      expect(result).toBeNull();
    });

    it('should throw error for other axios errors', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Network error'));

      await expect(employeeService.updateEmployee(1, {}))
        .rejects.toThrow('Failed to update employee: Network error');
    });
  });

  describe('deleteEmployee', () => {
    it('should delete employee', async () => {
      mockedAxios.delete.mockResolvedValue({});

      const result = await employeeService.deleteEmployee(1);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        'http://localhost:3001/employees/1'
      );
      expect(result).toBe(true);
    });

    it('should return false for 404 errors', async () => {
      mockedAxios.delete.mockRejectedValue({
        response: { status: 404 }
      });

      const result = await employeeService.deleteEmployee(999);

      expect(result).toBe(false);
    });

    it('should throw error for other axios errors', async () => {
      mockedAxios.delete.mockRejectedValue(new Error('Network error'));

      await expect(employeeService.deleteEmployee(1))
        .rejects.toThrow('Failed to delete employee: Network error');
    });
  });
});