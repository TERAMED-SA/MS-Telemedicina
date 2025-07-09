import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enviroment } from './enviroment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // ou ['http://localhost:3000'] para limitar
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  await app.listen(enviroment.SERVER_PORT);
}

bootstrap();
