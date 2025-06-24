import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from '../entities/harvest.entity';
import { Property } from '../entities/property.entity';
import { HarvestService } from '../services/harvest.service';
import { HarvestController } from '../controllers/harvest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Property])],
  controllers: [HarvestController],
  providers: [HarvestService],
  exports: [HarvestService],
})
export class HarvestModule {}