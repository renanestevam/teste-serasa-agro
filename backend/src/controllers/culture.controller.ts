import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CultureService } from '../services/culture.service';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { UpdateCultureDto } from '../dto/update-culture.dto';

@ApiTags('cultures')
@Controller('cultures')
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new culture' })
  @ApiResponse({ status: 201, description: 'Culture created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createCultureDto: CreateCultureDto) {
    return this.cultureService.create(createCultureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cultures' })
  @ApiResponse({ status: 200, description: 'Cultures retrieved successfully' })
  findAll() {
    return this.cultureService.findAll();
  }

  @Get('harvest/:harvestId')
  @ApiOperation({ summary: 'Get cultures by harvest ID' })
  @ApiResponse({ status: 200, description: 'Cultures retrieved successfully' })
  findByHarvest(@Param('harvestId') harvestId: string) {
    return this.cultureService.findByHarvest(harvestId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a culture by ID' })
  @ApiResponse({ status: 200, description: 'Culture retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Culture not found' })
  findOne(@Param('id') id: string) {
    return this.cultureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a culture' })
  @ApiResponse({ status: 200, description: 'Culture updated successfully' })
  @ApiResponse({ status: 404, description: 'Culture not found' })
  update(@Param('id') id: string, @Body() updateCultureDto: UpdateCultureDto) {
    return this.cultureService.update(id, updateCultureDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a culture' })
  @ApiResponse({ status: 204, description: 'Culture deleted successfully' })
  @ApiResponse({ status: 404, description: 'Culture not found' })
  remove(@Param('id') id: string) {
    return this.cultureService.remove(id);
  }
}