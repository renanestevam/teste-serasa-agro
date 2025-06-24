import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HarvestService } from '../services/harvest.service';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';

@ApiTags('harvests')
@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new harvest' })
  @ApiResponse({ status: 201, description: 'Harvest created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createHarvestDto: CreateHarvestDto) {
    return this.harvestService.create(createHarvestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all harvests' })
  @ApiResponse({ status: 200, description: 'Harvests retrieved successfully' })
  findAll() {
    return this.harvestService.findAll();
  }

  @Get('property/:propertyId')
  @ApiOperation({ summary: 'Get harvests by property ID' })
  @ApiResponse({ status: 200, description: 'Harvests retrieved successfully' })
  findByProperty(@Param('propertyId') propertyId: string) {
    return this.harvestService.findByProperty(propertyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a harvest by ID' })
  @ApiResponse({ status: 200, description: 'Harvest retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a harvest' })
  @ApiResponse({ status: 200, description: 'Harvest updated successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  update(@Param('id') id: string, @Body() updateHarvestDto: UpdateHarvestDto) {
    return this.harvestService.update(id, updateHarvestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a harvest' })
  @ApiResponse({ status: 204, description: 'Harvest deleted successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  remove(@Param('id') id: string) {
    return this.harvestService.remove(id);
  }
}