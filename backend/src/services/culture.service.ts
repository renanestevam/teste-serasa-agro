import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Culture } from '../entities/culture.entity';
import { Harvest } from '../entities/harvest.entity';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { UpdateCultureDto } from '../dto/update-culture.dto';

@Injectable()
export class CultureService {
  constructor(
    @InjectRepository(Culture)
    private cultureRepository: Repository<Culture>,
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
  ) {}

  async create(createCultureDto: CreateCultureDto): Promise<Culture> {
    const harvest = await this.harvestRepository.findOne({
      where: { id: createCultureDto.harvestId }
    });

    if (!harvest) {
      throw new NotFoundException('Harvest not found');
    }

    const culture = this.cultureRepository.create({
      ...createCultureDto,
      harvest
    });

    return await this.cultureRepository.save(culture);
  }

  async findAll(): Promise<Culture[]> {
    return await this.cultureRepository.find({
      relations: ['harvest']
    });
  }

  async findByHarvest(harvestId: string): Promise<Culture[]> {
    return await this.cultureRepository.find({
      where: { harvest: { id: harvestId } }
    });
  }

  async findOne(id: string): Promise<Culture> {
    const culture = await this.cultureRepository.findOne({
      where: { id },
      relations: ['harvest']
    });

    if (!culture) {
      throw new NotFoundException('Culture not found');
    }

    return culture;
  }

  async update(id: string, updateCultureDto: UpdateCultureDto): Promise<Culture> {
    const culture = await this.findOne(id);

    if (updateCultureDto.harvestId && updateCultureDto.harvestId !== culture.harvest.id) {
      const harvest = await this.harvestRepository.findOne({
        where: { id: updateCultureDto.harvestId }
      });

      if (!harvest) {
        throw new NotFoundException('Harvest not found');
      }

      culture.harvest = harvest;
    }

    Object.assign(culture, updateCultureDto);
    return await this.cultureRepository.save(culture);
  }

  async remove(id: string): Promise<void> {
    const culture = await this.findOne(id);
    await this.cultureRepository.remove(culture);
  }
}