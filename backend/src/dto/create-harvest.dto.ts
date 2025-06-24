import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateHarvestDto {
  @ApiProperty({ description: 'Harvest year' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  year: number;

  @ApiProperty({ description: 'Harvest season' })
  @IsString()
  @IsNotEmpty()
  season: string;

  @ApiProperty({ description: 'Property ID' })
  @IsString()
  @IsNotEmpty()
  propertyId: string;
}