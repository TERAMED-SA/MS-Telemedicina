import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { PrismaModule } from 'src/Infra/Providers/Prisma/prisma.module';
import { OtpService } from './otp.service';
import { NotificationsModule } from 'src/Infra/Providers/Notification/notifications.module';
import { NotificationsService } from 'src/Infra/Providers/Notification/notifications.service';

@Module({
  controllers: [OtpController],
  imports:[NotificationsModule],
  providers: [OtpService, PrismaModule, NotificationsService],
})
export class OtpModule {}
