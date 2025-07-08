import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { PrismaModule } from 'src/Infra/Providers/Prisma/prisma.module';
import { OtpService } from './otp.service';
import { NotificationsModule } from 'src/Infra/Providers/Notification/notifications.module';

@Module({
  controllers: [OtpController],
  providers: [OtpService, PrismaModule, NotificationsModule],
})
export class OtpModule {}
