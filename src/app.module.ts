import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BeneficiaryModule } from './Modules/Beneficiary/beneficiary.module';
import { RedisProviderModule } from './Infra/Providers/Redis/redis.module';
import { AppController } from './app.controller';
import { PrismaModule } from './Infra/Providers/Prisma/prisma.module';
import { RabbitMQModule } from './Infra/Providers/RabbitMQ/rabbitmq.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    PrismaModule,
    BeneficiaryModule,
    RedisProviderModule,
    RabbitMQModule
  ],
  controllers: [AppController]
})

export class AppModule { }