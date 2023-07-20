import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IStartup } from './config/IStartup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const startupConfig = configService.get<IStartup>('startup');

  console.log("-----------")
  console.log(startupConfig)

  app.enableCors({
    origin: [
      `${startupConfig.corsOriginUrl}`,
      `${startupConfig.corsContainerOriginUrl}`,
    ]
  });

  if (!startupConfig?.origin) app.listen(startupConfig.port);
  else await app.listen(startupConfig.port, startupConfig.origin);
}
bootstrap();
