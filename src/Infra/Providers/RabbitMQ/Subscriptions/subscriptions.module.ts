import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/Infra/Providers/Prisma/prisma.module';
import { SubscriptionConsumerService } from './subscriptions.service';
import { SubscriptionReadRepository } from 'src/Infra/Database/subscriptions.repository';
import { RabbitMQModule } from '../rabbitmq.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => RabbitMQModule),
  ],
  providers: [SubscriptionConsumerService, SubscriptionReadRepository],
  exports: [SubscriptionConsumerService, SubscriptionReadRepository], 
})
export class SubscriptionModule { }