import { Module } from '@nestjs/common';
import { SubscriptionProviderModule } from 'src/Infrastructure/Providers/Subscriptions/subscriptions.module';
import { SubscriptionService } from './subscriptions.service';

@Module({
  imports:      [
    SubscriptionProviderModule,
  ],
  providers:    [SubscriptionService],
  exports: [SubscriptionService]
})

export class SubscriptionModule {}