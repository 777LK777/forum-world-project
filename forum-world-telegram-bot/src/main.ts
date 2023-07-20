import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { getBotToken } from 'nestjs-telegraf';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const bot = app.get(getBotToken());

  const port = process.env.PORT ?? 4040;
  const webhookPath = process.env.WEBHOOK_PATH ?? '/sett-updatess';

  app.use(bot.webhookCallback(webhookPath));
  app.listen(port, () => console.log(`Bot server started on port = ${port}`));
  
}
bootstrap();
