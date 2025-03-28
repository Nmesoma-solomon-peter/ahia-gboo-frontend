import axios from 'axios';
import { API_URL } from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      console.log('Fetching product with ID:', id); // Debug log
      const response = await api.get(`/products/${id}`);
      console.log('API response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('API error:', error.response || error); // Debug log
      throw error.response?.data || error.message;
    }
  },

  // Create new product (for artisans)
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update product (for artisans)
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('API error:', error.response || error); // Debug log
      throw error.response?.data || error.message;
    }
  },

  // Delete product (for artisans)
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('API error:', error.response || error); // Debug log
      throw error.response?.data || error.message;
    }
  },
}; 