import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { enviroment } from './enviroment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa o CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Micro-Service - Telemedicine Management')
    .setVersion('1.0.0')
    .setDescription('Telemedicine Service documentation')
    .addServer(`http://localhost:${enviroment.SERVER_PORT}`, 'Desenvolvimento (Local)')
    .addServer('https://api.baikasaude.click', 'Desenvolvimento (Remoto)')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Endpoint da documentação Swagger
  SwaggerModule.setup('docs', app, document);

  // Inicializa a aplicação
  await app.listen(enviroment.SERVER_PORT);
}
bootstrap();
