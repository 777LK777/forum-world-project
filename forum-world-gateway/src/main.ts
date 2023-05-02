import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IStartup } from './config/IStartup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const startupConfig = configService.get<IStartup>('startup');

  console.log(`GATEWAY: ${startupConfig?.origin ?? "http://localhost"}:${startupConfig.port}`);
  console.log(`CORS: ${startupConfig.corsOrigin}:${startupConfig.corsPort}`);

  app.enableCors({
    origin: `${startupConfig.corsOrigin}:${startupConfig.corsPort}`
  });

  if (!startupConfig?.origin) app.listen(startupConfig.port);
  else await app.listen(startupConfig.port, startupConfig.origin);
}
bootstrap();
