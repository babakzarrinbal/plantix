import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000); // Default to 3000 if not set
  const origin = configService.get<string>('CORS_ORIGIN');

  // Using the config service to get the port number

  app.enableCors({ origin });

  await app.listen(port);
}
bootstrap();
