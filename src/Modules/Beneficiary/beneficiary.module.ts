import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { RapidocProviderModule } from 'src/Infra/Providers/Rapidoc/rapidoc.module';
import { BeneficiaryService } from './beneficiary.service';
import { RedisProviderModule } from 'src/Infra/Providers/Redis/redis.module';
import { BeneficiaryRepository } from 'src/Infra/Database/beneficiary.repository';

@Module({
  imports: [
    AutomapperModule,
    RapidocProviderModule,
    RedisProviderModule,
  ],
  providers: [
    BeneficiaryService,
    BeneficiaryRepository
  ],
  exports: [
    BeneficiaryService,
  ],
})
export class BeneficiaryModule {}