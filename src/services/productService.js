import axios from 'axios';
import { API_URL } from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a separate instance for public routes
const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists (only for authenticated routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  // Get all products (public route)
  getAllProducts: async () => {
    try {
      const response = await publicApi.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching all products:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Get product by ID (public route)
  getProductById: async (id) => {
    try {
      console.log('Fetching product with ID:', id);
      const response = await publicApi.get(`/products/${id}`);
      console.log('Product data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Create new product (for artisans)
  createProduct: async (productData) => {
    try {
      console.log('Creating product with data:', productData);
      const response = await api.post('/products', productData);
      console.log('Product created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Update product (for artisans)
  updateProduct: async (id, productData) => {
    try {
      console.log('Updating product with ID:', id);
      console.log('Update data:', productData);
      const response = await api.put(`/products/${id}`, productData);
      console.log('Product updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Delete product (for artisans)
  deleteProduct: async (id) => {
    try {
      console.log('Deleting product with ID:', id);
      const response = await api.delete(`/products/${id}`);
      console.log('Product deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },
}; 