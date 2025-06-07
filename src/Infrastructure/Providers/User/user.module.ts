import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { enviroment } from 'src/enviroment';
import { HttpClient } from '../http/config';
import { UserServiceProvider } from './user.service';

@Module({
  imports: [
    ConfigModule,
    AxiosModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>(enviroment.USER_BASE_URL),
        timeout: 5000,
        headers: {
          Authorization: enviroment.USER_AUTHORIZATION,
          'Content-Type': enviroment.USER_CONTENT_TYPE,
        },
      }),
      inject: [ConfigService],
    }),
    UserProviderModule
  ],
  providers: [
    HttpClient,
    UserServiceProvider 
  ],
  exports: [
    HttpClient,
    UserServiceProvider 
  ],
})

export class UserProviderModule {}