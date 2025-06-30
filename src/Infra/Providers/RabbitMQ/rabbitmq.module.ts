import { Module, forwardRef } from '@nestjs/common';
import { RabbitMQModule as GoLevelUpRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { enviroment } from 'src/enviroment';
import { PackageModule } from './Packages/package.module';
import { SubscriptionModule } from './Subscriptions/subscriptions.module';

@Module({
  imports: [
    GoLevelUpRabbitMQModule.forRoot({
      uri: enviroment.RABBITMQ_URI,
      connectionInitOptions: { wait: false },
    }),
    forwardRef(() => PackageModule),
    forwardRef(() => SubscriptionModule),
  ],
  exports: [
    GoLevelUpRabbitMQModule
  ],
})
export class RabbitMQModule {}