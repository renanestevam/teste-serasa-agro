import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerModule } from './modules/producer.module';
import { PropertyModule } from './modules/property.module';
import { HarvestModule } from './modules/harvest.module';
import { CultureModule } from './modules/culture.module';
import { DashboardModule } from './modules/dashboard.module';
import { SeedModule } from './modules/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProducerModule,
    PropertyModule,
    HarvestModule,
    CultureModule,
    DashboardModule,
    SeedModule,
  ],
})
export class AppModule {}