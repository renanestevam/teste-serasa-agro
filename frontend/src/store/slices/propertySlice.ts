import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Property, CreatePropertyDto } from '../../types';
import { propertyService } from '../../services/api';

interface PropertyState {
  properties: Property[];
  currentProperty: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  currentProperty: null,
  loading: false,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async () => {
    const response = await propertyService.getAll();
    return response.data;
  }
);

export const fetchPropertiesByProducer = createAsyncThunk(
  'property/fetchPropertiesByProducer',
  async (producerId: string) => {
    const response = await propertyService.getByProducer(producerId);
    return response.data;
  }
);

export const createProperty = createAsyncThunk(
  'property/createProperty',
  async (data: CreatePropertyDto) => {
    const response = await propertyService.create(data);
    return response.data;
  }
);

export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ id, data }: { id: string; data: Partial<CreatePropertyDto> }) => {
    const response = await propertyService.update(id, data);
    return response.data;
  }
);

export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (id: string) => {
    await propertyService.delete(id);
    return id;
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      })
      .addCase(fetchPropertiesByProducer.fulfilled, (state, action) => {
        state.properties = action.payload;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.properties.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        state.currentProperty = action.payload;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(p => p.id !== action.payload);
      });
  },
});

export const { clearCurrentProperty, clearError } = propertySlice.actions;
export default propertySlice.reducer;