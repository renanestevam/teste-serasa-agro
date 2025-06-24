import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProducerService } from '../services/producer.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';

@ApiTags('producers')
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiResponse({ status: 201, description: 'Producer created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Producer already exists' })
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all producers' })
  @ApiResponse({ status: 200, description: 'Producers retrieved successfully' })
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a producer by ID' })
  @ApiResponse({ status: 200, description: 'Producer retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a producer' })
  @ApiResponse({ status: 200, description: 'Producer updated successfully' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  update(@Param('id') id: string, @Body() updateProducerDto: UpdateProducerDto) {
    return this.producerService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a producer' })
  @ApiResponse({ status: 204, description: 'Producer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  remove(@Param('id') id: string) {
    return this.producerService.remove(id);
  }
}