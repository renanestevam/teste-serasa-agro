import { configureStore } from '@reduxjs/toolkit';
import producerReducer from './slices/producerSlice';
import propertyReducer from './slices/propertySlice';
import dashboardReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    producer: producerReducer,
    property: propertyReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;