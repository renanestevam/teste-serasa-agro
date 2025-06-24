import axios from 'axios';
import { Producer, Property, Harvest, Culture, CreateProducerDto, CreatePropertyDto, CreateHarvestDto, CreateCultureDto, DashboardData } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const producerService = {
  getAll: () => api.get<Producer[]>('/producers'),
  getById: (id: string) => api.get<Producer>(`/producers/${id}`),
  create: (data: CreateProducerDto) => api.post<Producer>('/producers', data),
  update: (id: string, data: Partial<CreateProducerDto>) => api.patch<Producer>(`/producers/${id}`, data),
  delete: (id: string) => api.delete(`/producers/${id}`),
};

export const propertyService = {
  getAll: () => api.get<Property[]>('/properties'),
  getById: (id: string) => api.get<Property>(`/properties/${id}`),
  getByProducer: (producerId: string) => api.get<Property[]>(`/properties/producer/${producerId}`),
  create: (data: CreatePropertyDto) => api.post<Property>('/properties', data),
  update: (id: string, data: Partial<CreatePropertyDto>) => api.patch<Property>(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`),
};

export const harvestService = {
  getAll: () => api.get<Harvest[]>('/harvests'),
  getById: (id: string) => api.get<Harvest>(`/harvests/${id}`),
  getByProperty: (propertyId: string) => api.get<Harvest[]>(`/harvests/property/${propertyId}`),
  create: (data: CreateHarvestDto) => api.post<Harvest>('/harvests', data),
  update: (id: string, data: Partial<CreateHarvestDto>) => api.patch<Harvest>(`/harvests/${id}`, data),
  delete: (id: string) => api.delete(`/harvests/${id}`),
};

export const cultureService = {
  getAll: () => api.get<Culture[]>('/cultures'),
  getById: (id: string) => api.get<Culture>(`/cultures/${id}`),
  getByHarvest: (harvestId: string) => api.get<Culture[]>(`/cultures/harvest/${harvestId}`),
  create: (data: CreateCultureDto) => api.post<Culture>('/cultures', data),
  update: (id: string, data: Partial<CreateCultureDto>) => api.patch<Culture>(`/cultures/${id}`, data),
  delete: (id: string) => api.delete(`/cultures/${id}`),
};

export const dashboardService = {
  getData: () => api.get<DashboardData>('/dashboard'),
};