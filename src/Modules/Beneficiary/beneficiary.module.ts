import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { RapidocProviderModule } from 'src/Infrastructure/Providers/Rapidoc/rapidoc.module';
import { BeneficiaryService } from './beneficiary.service';
import { RedisProviderModule } from 'src/Infrastructure/Providers/Redis';

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