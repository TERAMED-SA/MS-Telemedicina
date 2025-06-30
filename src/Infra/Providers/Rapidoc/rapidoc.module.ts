import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpClient } from '../Http/http.service';
import { RapidocBeneficiaryService } from './services/beneficiaries.service';
import { RapidocSchedulingService } from './services/scheduling.service';
import { HttpProviderModule } from '../Http/http.module';

@Module({
  imports: [
    ConfigModule,
    HttpProviderModule,
    AxiosModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('RAPIDOC_BASE_URL'),
        timeout: 5000,
        headers: {
          'Content-Type': configService.get<string>('RAPIDOC_CONTENT_TYPE'),
          'clientId': configService.get<string>('RAPIDOC_CLIENT_ID'),
          Authorization: configService.get<string>('RAPIDOC_AUTHORIZATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    RapidocSchedulingService,
    RapidocBeneficiaryService,
  ],
  exports: [
    RapidocSchedulingService,
    RapidocBeneficiaryService,
  ],
})
export class RapidocProviderModule {}