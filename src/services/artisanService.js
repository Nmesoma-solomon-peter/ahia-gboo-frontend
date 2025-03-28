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

export const artisanService = {
  // Get all artisans
  getAllArtisans: async () => {
    try {
      const response = await api.get('/artisans');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get artisan by ID
  getArtisanById: async (id) => {
    try {
      const response = await api.get(`/artisans/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update artisan profile
  updateArtisanProfile: async (id, profileData) => {
    try {
      const response = await api.put(`/artisans/${id}`, profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get artisan's products
  getArtisanProducts: async (id) => {
    try {
      const response = await api.get(`/artisans/${id}/products`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get artisan's orders
  getArtisanOrders: async (id) => {
    try {
      const response = await api.get(`/artisans/${id}/orders`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 