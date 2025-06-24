import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedController } from '../controllers/seed.controller';
import { SeedService } from '../services/seed.service';
import { Producer } from '../entities/producer.entity';
import { Property } from '../entities/property.entity';
import { Harvest } from '../entities/harvest.entity';
import { Culture } from '../entities/culture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Property, Harvest, Culture])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}