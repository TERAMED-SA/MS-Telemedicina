import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { enviroment } from 'src/enviroment';
import { HttpClient } from '../http/config';
import { SubscriptionServiceProvider } from './subscriptions.service';

@Module({
  imports: [
    ConfigModule,
    AxiosModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>(enviroment.SUBSCRIPTIONS_BASE_URL),
        timeout: 5000,
        headers: {
          Authorization: enviroment.SUBSCRIPTIONS_AUTHORIZATION,
          'Content-Type': enviroment.SUBSCRIPTIONS_CONTENT_TYPE,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    HttpClient,
    SubscriptionServiceProvider
  ],
  exports: [
    HttpClient,
    SubscriptionServiceProvider
  ],
})

export class SubscriptionProviderModule {}