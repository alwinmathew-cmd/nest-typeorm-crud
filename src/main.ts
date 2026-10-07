import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform:true }));
}
void bootstrap();

// transform:true handles string and back-forth pipe conversions,eliminates need for inidvidual pipes like PareseIntPipe

//NestJS's ValidationPipe({ whitelist: true }), any incoming fields in the request payload that are not defined 
// in your DTO are automatically stripped out before reaching your service.