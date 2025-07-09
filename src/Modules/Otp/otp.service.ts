import { Injectable, BadRequestException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { addMinutes } from 'date-fns';
import { NotificationsService } from 'src/Infra/Providers/Notification/notifications.service';
import { PrismaService } from 'src/Infra/Providers/Prisma/prisma.service';

@Injectable()
export class OtpService {
  constructor(private prisma: PrismaService, private notificationService: NotificationsService) { }

  async generateOtp(phoneNumber: string) {
    const code = String(randomInt(100000, 999999));
    const expiresAt = addMinutes(new Date(), 5);
    
    const beneficiary = await this.prisma.beneficiary.findUnique({
      where: { phone: phoneNumber },
    });
    
    if (!beneficiary) {
      return new BadRequestException('Beneficiário não encontrado');
    }

    console.log(`OTP para ${phoneNumber}: ${code}`);
    
    
    const valueOtp = await this.prisma.otpRequest.create({
      data: {
        phoneNumber,
        code,
        expiresAt,
        beneficiaryId: beneficiary.id,
      },
    });
    
    const data={
      to: phoneNumber,
      body: `Seu código de verificação para Telemedicina é: ${code}`,
    }
    const result = await this.notificationService.sendSms(data);
    
    if (result) {
      await this.prisma.otpRequest.delete({
        where: { id: valueOtp.id },
      });

      return result;
    }
    

    return { message: 'SMS enviado com sucesso' };
  }

  async verifyOtp(phoneNumber: string, code: string) {
    const otp = await this.prisma.otpRequest.findFirst({
      where: {
        phoneNumber,
        code,
        verified: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp) {
      return new BadRequestException('Código inválido ou expirado');
    }

    const user = await this.prisma.otpRequest.update({
      where: { id: otp.id },
      data: { verified: true },
    });

    return { userId: user.beneficiaryId, message: 'Código verificado com sucesso' };
  }
}
