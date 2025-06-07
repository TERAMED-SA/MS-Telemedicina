import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Features } from './Features/feature';

@Controller()
export class AppController {
  constructor(private readonly telemedicineFeature: Features) {}

  @Post('/beneficiary')
  async createBeneficiary(@Body('userId') userId: string, @Body('subscriptionId') subscriptionId: string) {
    return await this.createBeneficiary(userId, subscriptionId);
  }

  @Post('/telemedicine/appointments/:userId/enter')
  async enterAnAppointmentNow(@Param('userId') userId: string): Promise<string> {
    return await this.telemedicineFeature.enterAnAppointmentNow(userId);
  }

  @Get('/beneficiary')
  async scheduleAppointment() {
    return "Teste de retorno"
  }
}