import { Module } from '@nestjs/common';
import { RabbitMQModule as GoLevelUpRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PackageModule } from './Packages/package.module';
import { SubscriptionModule } from './Subscriptions/subscriptions.module';
import { enviroment } from 'src/enviroment';

@Module({
  imports: [
    GoLevelUpRabbitMQModule.forRoot({
      uri: enviroment.RABBITMQ_URI,
      connectionInitOptions: { wait: false },
    }),
    PackageModule,
    SubscriptionModule,
  ],
  exports: [
    GoLevelUpRabbitMQModule,
    PackageModule,
    SubscriptionModule,
  ],
})
export class RabbitMQModule {}