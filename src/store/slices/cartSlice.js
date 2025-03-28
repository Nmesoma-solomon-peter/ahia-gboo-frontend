import { createSlice } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService';

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + action.payload.quantity, 10);
      } else {
        state.items.push({
          ...action.payload,
          quantity: Math.min(action.payload.quantity, 10)
        });
      }
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = Math.min(quantity, 10);
        state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('order/createOrder/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('order/createOrder/fulfilled', (state) => {
        state.loading = false;
        state.items = [];
        state.total = 0;
      })
      .addCase('order/createOrder/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setError, clearError } = cartSlice.actions;
export default cartSlice.reducer; 