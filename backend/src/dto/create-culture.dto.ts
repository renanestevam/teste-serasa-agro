import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCultureDto {
  @ApiProperty({ description: 'Type of culture (e.g., Soja, Milho)' })
  @IsString()
  @IsNotEmpty()
  cultureType: string;

  @ApiProperty({ description: 'Planted area in hectares' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  plantedArea: number;

  @ApiProperty({ description: 'Harvest ID' })
  @IsString()
  @IsNotEmpty()
  harvestId: string;
}