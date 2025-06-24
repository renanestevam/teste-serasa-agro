import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Producer } from '../entities/producer.entity';
import { PropertyService } from '../services/property.service';
import { PropertyController } from '../controllers/property.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Producer])],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}