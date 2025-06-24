import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedService } from './services/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('Serasa Agro API')
    .setDescription('API for managing rural producers and properties')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
  
  setTimeout(async () => {
    try {
      const seedService = app.get(SeedService);
      await seedService.seedDatabase();
      console.log('Database seeded successfully');
    } catch (error) {
      console.log('Database seed skipped or failed:', error.message);
    }
  }, 2000);
}
bootstrap();