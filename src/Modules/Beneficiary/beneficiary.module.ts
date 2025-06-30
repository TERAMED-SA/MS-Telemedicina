import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { RapidocProviderModule } from 'src/Infra/Providers/Rapidoc/rapidoc.module';
import { BeneficiaryService } from './beneficiary.service';
import { RedisProviderModule } from 'src/Infra/Providers/Redis/redis.module';

@Module({
  imports:      [
    AutomapperModule, 
    RapidocProviderModule,
    RedisProviderModule
  ],
  providers:    [
    BeneficiaryService, 
  ],
  exports:      [
    BeneficiaryService, 
  ],
})

export class BeneficiaryModule {}