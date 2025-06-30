import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BeneficiaryModule } from './Modules/Beneficiary/beneficiary.module';
import { RedisProviderModule } from './Infra/Providers/Redis';
import { AppController } from './app.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PackageConsumerService } from './Infra/Providers/RabbitMQ/Packages/package-consumer.service';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    BeneficiaryModule,
    RedisProviderModule,
    RabbitMQModule.forRoot({
      uri: process.env.RABBITMQ_URI  || 'amqps://vwsjvuxn:ETVjObxd0LWal0pxMvg4wmPGLbJQNw0R@jackal.rmq.cloudamqp.com/vwsjvuxn',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [AppController],
  providers: [PackageConsumerService]
})

export class AppModule { }