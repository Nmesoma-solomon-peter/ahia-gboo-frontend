import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { artisanService } from '../../services/artisanService';

export const fetchArtisans = createAsyncThunk(
  'artisans/fetchArtisans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await artisanService.getAllArtisans();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArtisanById = createAsyncThunk(
  'artisans/fetchArtisanById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await artisanService.getArtisanById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArtisanProfile = createAsyncThunk(
  'artisans/updateArtisanProfile',
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await artisanService.updateArtisanProfile(id, profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArtisanProducts = createAsyncThunk(
  'artisans/fetchArtisanProducts',
  async (id, { rejectWithValue }) => {
    try {
      const response = await artisanService.getArtisanProducts(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArtisanOrders = createAsyncThunk(
  'artisans/fetchArtisanOrders',
  async (id, { rejectWithValue }) => {
    try {
      const response = await artisanService.getArtisanOrders(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'artisans/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await artisanService.updateOrderStatus(orderId, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  artisans: [],
  currentArtisan: null,
  artisanProducts: [],
  artisanOrders: [],
  loading: false,
  error: null,
};

const artisanSlice = createSlice({
  name: 'artisans',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentArtisan: (state) => {
      state.currentArtisan = null;
      state.artisanProducts = [];
      state.artisanOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Artisans
      .addCase(fetchArtisans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtisans.fulfilled, (state, action) => {
        state.loading = false;
        state.artisans = action.payload;
      })
      .addCase(fetchArtisans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Artisan by ID
      .addCase(fetchArtisanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtisanById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArtisan = action.payload;
      })
      .addCase(fetchArtisanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Artisan Profile
      .addCase(updateArtisanProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArtisanProfile.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.artisans.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.artisans[index] = action.payload;
        }
        if (state.currentArtisan?.id === action.payload.id) {
          state.currentArtisan = action.payload;
        }
      })
      .addCase(updateArtisanProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Artisan Products
      .addCase(fetchArtisanProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtisanProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.artisanProducts = action.payload;
      })
      .addCase(fetchArtisanProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Artisan Orders
      .addCase(fetchArtisanOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtisanOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.artisanOrders = action.payload;
      })
      .addCase(fetchArtisanOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.artisanOrders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.artisanOrders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentArtisan } = artisanSlice.actions;
export default artisanSlice.reducer; 