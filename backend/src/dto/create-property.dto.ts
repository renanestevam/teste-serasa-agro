import { IsString, IsNotEmpty, IsNumber, IsPositive, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AreaSumValidator } from './validators/area.validator';

export class CreatePropertyDto {
  @ApiProperty({ description: 'Name of the farm' })
  @IsString()
  @IsNotEmpty()
  farmName: string;

  @ApiProperty({ description: 'City where the farm is located' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State where the farm is located' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Total area in hectares' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @Validate(AreaSumValidator)
  totalArea: number;

  @ApiProperty({ description: 'Cultivable area in hectares' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  cultivableArea: number;

  @ApiProperty({ description: 'Vegetation area in hectares' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  vegetationArea: number;

  @ApiProperty({ description: 'Producer ID' })
  @IsString()
  @IsNotEmpty()
  producerId: string;
}