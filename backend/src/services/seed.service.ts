import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../entities/producer.entity';
import { Property } from '../entities/property.entity';
import { Harvest } from '../entities/harvest.entity';
import { Culture } from '../entities/culture.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Culture)
    private cultureRepository: Repository<Culture>,
  ) {}

  async seedDatabase() {
    const existingProperties = await this.propertyRepository.count();
    if (existingProperties > 0) {
      return { message: 'Database already has properties data' };
    }

    const producers = [];
    const properties = [];
    const harvests = [];
    const cultures = [];

    const sampleProducers = [
      { cpfCnpj: '12345678901', producerName: 'João Silva' },
      { cpfCnpj: '98765432101', producerName: 'Maria Santos' },
      { cpfCnpj: '12345678000195', producerName: 'Fazenda ABC Ltda' },
      { cpfCnpj: '98765432000176', producerName: 'Agropecuária XYZ' },
    ];

    for (const producerData of sampleProducers) {
      const producer = this.producerRepository.create(producerData);
      const savedProducer = await this.producerRepository.save(producer);
      producers.push(savedProducer);
    }

    const sampleProperties = [
      { farmName: 'Fazenda Boa Vista', city: 'Ribeirão Preto', state: 'SP', totalArea: 500, cultivableArea: 300, vegetationArea: 200, producer: producers[0] },
      { farmName: 'Sítio Verde', city: 'Goiânia', state: 'GO', totalArea: 200, cultivableArea: 120, vegetationArea: 80, producer: producers[0] },
      { farmName: 'Fazenda Esperança', city: 'Campo Grande', state: 'MS', totalArea: 800, cultivableArea: 500, vegetationArea: 300, producer: producers[1] },
      { farmName: 'Rancho do Sol', city: 'Cuiabá', state: 'MT', totalArea: 1200, cultivableArea: 800, vegetationArea: 400, producer: producers[2] },
      { farmName: 'Fazenda Progresso', city: 'Brasília', state: 'DF', totalArea: 600, cultivableArea: 400, vegetationArea: 200, producer: producers[3] },
    ];

    for (const propertyData of sampleProperties) {
      const property = this.propertyRepository.create(propertyData);
      const savedProperty = await this.propertyRepository.save(property);
      properties.push(savedProperty);
    }

    const sampleHarvests = [
      { year: 2023, season: 'Verão', property: properties[0] },
      { year: 2023, season: 'Inverno', property: properties[0] },
      { year: 2023, season: 'Verão', property: properties[1] },
      { year: 2023, season: 'Verão', property: properties[2] },
      { year: 2023, season: 'Inverno', property: properties[2] },
      { year: 2023, season: 'Verão', property: properties[3] },
      { year: 2023, season: 'Verão', property: properties[4] },
    ];

    for (const harvestData of sampleHarvests) {
      const harvest = this.harvestRepository.create(harvestData);
      const savedHarvest = await this.harvestRepository.save(harvest);
      harvests.push(savedHarvest);
    }

    const sampleCultures = [
      { cultureType: 'Soja', plantedArea: 150, harvest: harvests[0] },
      { cultureType: 'Milho', plantedArea: 100, harvest: harvests[1] },
      { cultureType: 'Algodão', plantedArea: 80, harvest: harvests[2] },
      { cultureType: 'Soja', plantedArea: 200, harvest: harvests[3] },
      { cultureType: 'Trigo', plantedArea: 120, harvest: harvests[4] },
      { cultureType: 'Milho', plantedArea: 300, harvest: harvests[5] },
      { cultureType: 'Soja', plantedArea: 250, harvest: harvests[6] },
      { cultureType: 'Café', plantedArea: 50, harvest: harvests[0] },
      { cultureType: 'Cana-de-açúcar', plantedArea: 180, harvest: harvests[3] },
    ];

    for (const cultureData of sampleCultures) {
      const culture = this.cultureRepository.create(cultureData);
      cultures.push(await this.cultureRepository.save(culture));
    }

    return {
      message: 'Database seeded successfully',
      data: {
        producers: producers.length,
        properties: properties.length,
        harvests: harvests.length,
        cultures: cultures.length,
      },
    };
  }
}