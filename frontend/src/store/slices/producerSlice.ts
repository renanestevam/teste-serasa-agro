import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Producer, CreateProducerDto } from '../../types';
import { producerService } from '../../services/api';

interface ProducerState {
  producers: Producer[];
  currentProducer: Producer | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProducerState = {
  producers: [],
  currentProducer: null,
  loading: false,
  error: null,
};

export const fetchProducers = createAsyncThunk(
  'producer/fetchProducers',
  async () => {
    const response = await producerService.getAll();
    return response.data;
  }
);

export const fetchProducerById = createAsyncThunk(
  'producer/fetchProducerById',
  async (id: string) => {
    const response = await producerService.getById(id);
    return response.data;
  }
);

export const createProducer = createAsyncThunk(
  'producer/createProducer',
  async (data: CreateProducerDto) => {
    const response = await producerService.create(data);
    return response.data;
  }
);

export const updateProducer = createAsyncThunk(
  'producer/updateProducer',
  async ({ id, data }: { id: string; data: Partial<CreateProducerDto> }) => {
    const response = await producerService.update(id, data);
    return response.data;
  }
);

export const deleteProducer = createAsyncThunk(
  'producer/deleteProducer',
  async (id: string) => {
    await producerService.delete(id);
    return id;
  }
);

const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    clearCurrentProducer: (state) => {
      state.currentProducer = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch producers';
      })
      .addCase(fetchProducerById.fulfilled, (state, action) => {
        state.currentProducer = action.payload;
      })
      .addCase(createProducer.fulfilled, (state, action) => {
        state.producers.push(action.payload);
      })
      .addCase(updateProducer.fulfilled, (state, action) => {
        const index = state.producers.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.producers[index] = action.payload;
        }
        state.currentProducer = action.payload;
      })
      .addCase(deleteProducer.fulfilled, (state, action) => {
        state.producers = state.producers.filter(p => p.id !== action.payload);
      });
  },
});

export const { clearCurrentProducer, clearError } = producerSlice.actions;
export default producerSlice.reducer;