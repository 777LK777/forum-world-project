import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 4040;
  const uiPort = process.env.UI_PORT || 3050;
  const portString = port === 4040 ? 'default' : port;
  const uiPortString = uiPort === 3050 ? 'default' : uiPort;

  console.log(`GATEWAY PORT: ${portString}`)
  console.log(`CORS PORT: ${uiPortString}`)

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: `http://localhost:${uiPort}`
  })

  await app.listen(port, () => console.log(`Gateway server started on port = ${port}`));
}
bootstrap();
