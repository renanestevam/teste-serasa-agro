import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../entities/producer.entity';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const existingProducer = await this.producerRepository.findOne({
      where: { cpfCnpj: createProducerDto.cpfCnpj }
    });

    if (existingProducer) {
      throw new ConflictException('Producer with this CPF/CNPJ already exists');
    }

    const producer = this.producerRepository.create(createProducerDto);
    return await this.producerRepository.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return await this.producerRepository.find({
      relations: ['properties', 'properties.harvests', 'properties.harvests.cultures']
    });
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOne({
      where: { id },
      relations: ['properties', 'properties.harvests', 'properties.harvests.cultures']
    });

    if (!producer) {
      throw new NotFoundException('Producer not found');
    }

    return producer;
  }

  async update(id: string, updateProducerDto: UpdateProducerDto): Promise<Producer> {
    const producer = await this.findOne(id);

    if (updateProducerDto.cpfCnpj && updateProducerDto.cpfCnpj !== producer.cpfCnpj) {
      const existingProducer = await this.producerRepository.findOne({
        where: { cpfCnpj: updateProducerDto.cpfCnpj }
      });

      if (existingProducer) {
        throw new ConflictException('Producer with this CPF/CNPJ already exists');
      }
    }

    Object.assign(producer, updateProducerDto);
    return await this.producerRepository.save(producer);
  }

  async remove(id: string): Promise<void> {
    const producer = await this.findOne(id);
    await this.producerRepository.remove(producer);
  }
}