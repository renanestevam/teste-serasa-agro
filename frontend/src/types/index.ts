export interface Producer {
  id: string;
  cpfCnpj: string;
  producerName: string;
  properties: Property[];
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  cultivableArea: number;
  vegetationArea: number;
  harvests: Harvest[];
  createdAt: string;
  updatedAt: string;
}

export interface Harvest {
  id: string;
  year: number;
  season: string;
  cultures: Culture[];
  createdAt: string;
  updatedAt: string;
}

export interface Culture {
  id: string;
  cultureType: string;
  plantedArea: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProducerDto {
  cpfCnpj: string;
  producerName: string;
}

export interface CreatePropertyDto {
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  cultivableArea: number;
  vegetationArea: number;
  producerId: string;
}

export interface CreateHarvestDto {
  year: number;
  season: string;
  propertyId: string;
}

export interface CreateCultureDto {
  cultureType: string;
  plantedArea: number;
  harvestId: string;
}

export interface DashboardData {
  totalFarms: number;
  totalHectares: number;
  farmsByState: { state: string; count: number }[];
  culturesByType: { type: string; count: number }[];
  landUse: { cultivable: number; vegetation: number };
}