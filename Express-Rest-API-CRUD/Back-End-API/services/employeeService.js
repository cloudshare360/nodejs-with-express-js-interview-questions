const axios = require('axios');

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

class EmployeeService {
  constructor() {
    this.baseUrl = `${JSON_SERVER_URL}/employees`;
  }

  async getAllEmployees(filters = {}, page = 1, limit = 10) {
    try {
      let url = this.baseUrl;
      const params = new URLSearchParams();
      
      // Add filters
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      // Add pagination
      params.append('_page', page);
      params.append('_limit', limit);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await axios.get(url);
      
      // Calculate pagination info
      const totalCount = parseInt(response.headers['x-total-count'] || response.data.length);
      const totalPages = Math.ceil(totalCount / limit);
      
      return {
        data: response.data,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }
  }

  async getEmployeeById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }

  async createEmployee(employeeData) {
    try {
      const response = await axios.post(this.baseUrl, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create employee: ${error.message}`);
    }
  }

  async updateEmployee(id, updateData) {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, updateData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw new Error(`Failed to update employee: ${error.message}`);
    }
  }

  async deleteEmployee(id) {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
      return true;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      }
      throw new Error(`Failed to delete employee: ${error.message}`);
    }
  }
}

module.exports = new EmployeeService();