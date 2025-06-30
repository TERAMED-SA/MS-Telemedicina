import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { BeneficiaryService } from './Modules/Beneficiary/beneficiary.service';
import { BecomeBeneficiaryRequestDto, UpdateBeneficiaryRequestDto } from './Infra/Providers/Rapidoc/dtos/beneficiaries';

@Controller()
export class AppController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Post('beneficiaries')
  async createBeneficiary(@Body() body: BecomeBeneficiaryRequestDto) {
    return this.beneficiaryService.createBeneficiary(body);
  }

  @Get('beneficiaries')
  async getBeneficiaries() {
    return this.beneficiaryService.getBeneficiaries();
  }

  @Get('beneficiaries/:cpf')
  async getBeneficiaryById(@Param('cpf') cpf: string) {
    return this.beneficiaryService.getBeneficiaryById(cpf);
  }

  @Get('beneficiaries/:uuid/appointments')
  async getBeneficiaryAppointments(@Param('uuid') uuid: string) {
    return this.beneficiaryService.getBeneficiaryAppointments(uuid);
  }

  @Get('beneficiaries/:uuid/referrals')
  async getBeneficiaryReferrals(@Param('uuid') uuid: string) {
    return this.beneficiaryService.getBeneficiaryReferrals(uuid);
  }

  @Put('beneficiaries/:uuid')
  async updateBeneficiary(
    @Param('uuid') uuid: string,
    @Body() body: UpdateBeneficiaryRequestDto
  ) {
    return this.beneficiaryService.updateBeneficiary(uuid, body);
  }

  @Get('beneficiaries/:uuid/request-room-access')
  async requestRoomAccess(@Param('uuid') uuid: string) {
    return this.beneficiaryService.requestRoomAccess(uuid);
  }

  @Delete('beneficiaries/:uuid')
  async deactivateBeneficiary(@Param('uuid') uuid: string) {
    return this.beneficiaryService.deactivateBeneficiary(uuid);
  }

  @Put('beneficiaries/:uuid/reactivate')
  async reactivateBeneficiary(@Param('uuid') uuid: string) {
    return this.beneficiaryService.reactivateBeneficiary(uuid);
  }

  @Get('specialities')
  async readSpecialities() {
    console.log('Reading specialities...');
    
    return await this.beneficiaryService.readSpecialities();
  }
}