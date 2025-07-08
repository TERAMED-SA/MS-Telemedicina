import { Injectable, BadRequestException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { addMinutes } from 'date-fns';
import { PrismaService } from 'src/Infra/Providers/Prisma/prisma.service';

@Injectable()
export class OtpService {
  constructor(private prisma: PrismaService) {}

  async generateOtp(phoneNumber: string) {
    const code = String(randomInt(100000, 999999));
    const expiresAt = addMinutes(new Date(), 5); 

    console.log(`OTP para ${phoneNumber}: ${code}`);

    const beneficiary = await this.prisma.beneficiary.findUnique({
      where: { phone: phoneNumber },
    });

    if (!beneficiary) {
      return new BadRequestException('Beneficiário não encontrado');
    }

    await this.prisma.otpRequest.create({
      data: {
        phoneNumber,
        code,
        expiresAt,
        beneficiaryId: beneficiary.id,
      },
    });

    return { message: 'OTP enviado com sucesso' };
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
