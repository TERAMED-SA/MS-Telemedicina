import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BeneficiaryModule } from './Modules/Beneficiary/beneficiary.module';
import { RapidocProviderModule } from './Infrastructure/Providers/Rapidoc/rapidoc.module';
import { UserProviderModule } from './Infrastructure/Providers/User/user.module';
import { SubscriptionProviderModule } from './Infrastructure/Providers/Subscriptions/subscriptions.module';
import { RedisProviderModule } from './Infrastructure/Providers/Redis';
import { AppController } from './app.controller';
import { Features } from './Features/feature';
import { SubscriptionModule } from './Modules/Subscriptions/subscriptions.module';
import { UserModule } from './Modules/User/user.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    BeneficiaryModule,
    SubscriptionModule,
    RedisProviderModule,
  ],
  controllers: [AppController],
  providers: [Features]
})
export class AppModule { }