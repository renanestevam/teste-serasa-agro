import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Culture } from '../entities/culture.entity';
import { Harvest } from '../entities/harvest.entity';
import { CultureService } from '../services/culture.service';
import { CultureController } from '../controllers/culture.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Culture, Harvest])],
  controllers: [CultureController],
  providers: [CultureService],
  exports: [CultureService],
})
export class CultureModule {}