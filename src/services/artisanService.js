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
  } else {
    // If no token, redirect to login
    window.location.href = '/login';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle data transformation
const transformResponse = (data) => {
  try {
    const parsed = JSON.parse(data);
    if (parsed.specialties) {
      parsed.specialties = parsed.specialties.split(',').map(s => s.trim()).filter(s => s);
    }
    return parsed;
  } catch (error) {
    return data;
  }
};

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Add response interceptor to both API instances
api.interceptors.response.use((response) => {
  if (response.data) {
    response.data = transformResponse(JSON.stringify(response.data));
  }
  return response;
});

publicApi.interceptors.response.use((response) => {
  if (response.data) {
    response.data = transformResponse(JSON.stringify(response.data));
  }
  return response;
});

export const artisanService = {
  // Get all artisans (public route)
  getAllArtisans: async () => {
    try {
      console.log('Fetching all artisans...');
      const response = await publicApi.get('/artisans');
      console.log('Artisans response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching artisans:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Get artisan by ID (public route)
  getArtisanById: async (id) => {
    try {
      console.log('Fetching artisan with ID:', id);
      const response = await publicApi.get(`/artisans/${id}`);
      console.log('Artisan response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching artisan:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Update artisan profile (protected route)
  updateArtisanProfile: async (id, data) => {
    try {
      console.log('Updating artisan profile:', { id, data });
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        throw new Error('No authentication token found');
      }
      const response = await api.put(`/artisans/${id}`, data);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating artisan profile:', error.response?.data || error);
      if (error.response?.status === 403) {
        window.location.href = '/login';
      }
      throw error.response?.data || error;
    }
  },

  // Get artisan's products (public route)
  getArtisanProducts: async (id) => {
    try {
      console.log('Fetching products for artisan ID:', id);
      const response = await publicApi.get(`/artisans/${id}/products`);
      console.log('Artisan products response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching artisan products:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Get artisan's orders (protected route)
  getArtisanOrders: async (id) => {
    try {
      const response = await api.get(`/artisans/${id}/orders`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update order status (protected route)
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 