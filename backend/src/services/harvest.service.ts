import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from '../entities/harvest.entity';
import { Property } from '../entities/property.entity';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async create(createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    const property = await this.propertyRepository.findOne({
      where: { id: createHarvestDto.propertyId }
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const harvest = this.harvestRepository.create({
      ...createHarvestDto,
      property
    });

    return await this.harvestRepository.save(harvest);
  }

  async findAll(): Promise<Harvest[]> {
    return await this.harvestRepository.find({
      relations: ['property', 'cultures']
    });
  }

  async findByProperty(propertyId: string): Promise<Harvest[]> {
    return await this.harvestRepository.find({
      where: { property: { id: propertyId } },
      relations: ['cultures']
    });
  }

  async findOne(id: string): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOne({
      where: { id },
      relations: ['property', 'cultures']
    });

    if (!harvest) {
      throw new NotFoundException('Harvest not found');
    }

    return harvest;
  }

  async update(id: string, updateHarvestDto: UpdateHarvestDto): Promise<Harvest> {
    const harvest = await this.findOne(id);

    if (updateHarvestDto.propertyId && updateHarvestDto.propertyId !== harvest.property.id) {
      const property = await this.propertyRepository.findOne({
        where: { id: updateHarvestDto.propertyId }
      });

      if (!property) {
        throw new NotFoundException('Property not found');
      }

      harvest.property = property;
    }

    Object.assign(harvest, updateHarvestDto);
    return await this.harvestRepository.save(harvest);
  }

  async remove(id: string): Promise<void> {
    const harvest = await this.findOne(id);
    await this.harvestRepository.remove(harvest);
  }
}