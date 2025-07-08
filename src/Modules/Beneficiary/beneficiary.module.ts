import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { RapidocProviderModule } from 'src/Infra/Providers/Rapidoc/rapidoc.module';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryRepository } from 'src/Infra/Database/beneficiary.repository';
import { BeneficiaryController } from './beneficiary.controller';

@Module({
  controllers: [BeneficiaryController],
  imports: [
    AutomapperModule,
    RapidocProviderModule
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