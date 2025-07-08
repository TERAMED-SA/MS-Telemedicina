import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { PrismaModule } from 'src/Infra/Providers/Prisma/prisma.module';
import { OtpService } from './otp.service';

@Module({
  controllers: [OtpController],
  providers: [OtpService, PrismaModule],
})
export class OtpModule {}
