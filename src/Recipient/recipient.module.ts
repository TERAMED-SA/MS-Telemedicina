import { Module } from '@nestjs/common';
import { RecipientController } from './recipient.controller';
import { GetAllService } from './services/GetAll.service';

@Module({
  controllers:  [RecipientController],
  providers:    [GetAllService]
})
export class RecipientModule {}
