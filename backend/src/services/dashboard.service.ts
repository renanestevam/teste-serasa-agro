import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { Culture } from '../entities/culture.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Culture)
    private cultureRepository: Repository<Culture>,
  ) {}

  async getDashboardData() {
    const totalFarms = await this.propertyRepository.count();
    
    const totalAreaResult = await this.propertyRepository
      .createQueryBuilder('property')
      .select('SUM(property.totalArea)', 'total')
      .getRawOne();
    
    const totalHectares = parseFloat(totalAreaResult.total) || 0;

    const farmsByState = await this.propertyRepository
      .createQueryBuilder('property')
      .select('property.state', 'state')
      .addSelect('COUNT(*)', 'count')
      .groupBy('property.state')
      .getRawMany();

    const culturesByType = await this.cultureRepository
      .createQueryBuilder('culture')
      .select('culture.cultureType', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('culture.cultureType')
      .getRawMany();

    const landUseResult = await this.propertyRepository
      .createQueryBuilder('property')
      .select('SUM(property.cultivableArea)', 'cultivable')
      .addSelect('SUM(property.vegetationArea)', 'vegetation')
      .getRawOne();

    const landUse = {
      cultivable: parseFloat(landUseResult.cultivable) || 0,
      vegetation: parseFloat(landUseResult.vegetation) || 0,
    };

    return {
      totalFarms,
      totalHectares,
      farmsByState: farmsByState.map(item => ({
        state: item.state,
        count: parseInt(item.count)
      })),
      culturesByType: culturesByType.map(item => ({
        type: item.type,
        count: parseInt(item.count)
      })),
      landUse
    };
  }
}