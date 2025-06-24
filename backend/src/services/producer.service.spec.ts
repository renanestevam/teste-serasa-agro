import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerService } from './producer.service';
import { Producer } from '../entities/producer.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ProducerService', () => {
  let service: ProducerService;
  let repository: Repository<Producer>;

  const mockProducer = {
    id: '1',
    cpfCnpj: '11144477735',
    producerName: 'Test Producer',
    properties: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repository = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a producer successfully', async () => {
      const createDto = { cpfCnpj: '11144477735', producerName: 'Test Producer' };
      
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(mockProducer);
      mockRepository.save.mockResolvedValue(mockProducer);

      const result = await service.create(createDto);

      expect(result).toEqual(mockProducer);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { cpfCnpj: createDto.cpfCnpj }
      });
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockProducer);
    });

    it('should throw ConflictException if producer already exists', async () => {
      const createDto = { cpfCnpj: '11144477735', producerName: 'Test Producer' };
      
      mockRepository.findOne.mockResolvedValue(mockProducer);

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return a producer if found', async () => {
      mockRepository.findOne.mockResolvedValue(mockProducer);

      const result = await service.findOne('1');

      expect(result).toEqual(mockProducer);
    });

    it('should throw NotFoundException if producer not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all producers', async () => {
      const producers = [mockProducer];
      mockRepository.find.mockResolvedValue(producers);

      const result = await service.findAll();

      expect(result).toEqual(producers);
    });
  });
});