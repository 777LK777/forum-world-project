import { Module } from '@nestjs/common';

import { CoreModule } from './core-api/core.module';
import startup from './config/startup-config'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forFeature(startup)
  ],
})
export class AppModule {}
