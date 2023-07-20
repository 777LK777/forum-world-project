import { Module } from '@nestjs/common';

import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TOKEN,
      include: [EchoModule],
      launchOptions: {
        webhook: {
          domain: process.env.WEBHOOK_DOMAIN,
          hookPath: process.env.WEBHOOK_PATH
        }
      }
    }),
    EchoModule
  ]
})
export class AppModule {}
