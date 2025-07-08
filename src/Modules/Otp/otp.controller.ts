import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('request')
  async requestOtp(@Body('phone') phone: string) {
    return this.otpService.generateOtp(phone);
  }

  @Post('verify')
  async verifyOtp(@Body() body: { phone: string; code: string }) {
    return this.otpService.verifyOtp(body.phone, body.code);
  }
}
