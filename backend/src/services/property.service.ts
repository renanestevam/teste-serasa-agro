import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { Producer } from '../entities/producer.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const producer = await this.producerRepository.findOne({
      where: { id: createPropertyDto.producerId }
    });

    if (!producer) {
      throw new NotFoundException('Producer not found');
    }

    const property = this.propertyRepository.create({
      ...createPropertyDto,
      producer
    });

    return await this.propertyRepository.save(property);
  }

  async findAll(): Promise<Property[]> {
    return await this.propertyRepository.find({
      relations: ['producer', 'harvests', 'harvests.cultures']
    });
  }

  async findByProducer(producerId: string): Promise<Property[]> {
    return await this.propertyRepository.find({
      where: { producer: { id: producerId } },
      relations: ['harvests', 'harvests.cultures']
    });
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['producer', 'harvests', 'harvests.cultures']
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    const property = await this.findOne(id);

    if (updatePropertyDto.producerId && updatePropertyDto.producerId !== property.producer.id) {
      const producer = await this.producerRepository.findOne({
        where: { id: updatePropertyDto.producerId }
      });

      if (!producer) {
        throw new NotFoundException('Producer not found');
      }

      property.producer = producer;
    }

    Object.assign(property, updatePropertyDto);
    return await this.propertyRepository.save(property);
  }

  async remove(id: string): Promise<void> {
    const property = await this.findOne(id);
    await this.propertyRepository.remove(property);
  }
}