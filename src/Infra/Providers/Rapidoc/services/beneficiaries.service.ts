import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  BecomeBeneficiaryRequestDto,
  BecomeBeneficiaryResponseDto,
  BeneficiaryRequestServiceResponseDto,
  ReadBeneficiariesResponseDto,
  ReadBeneficiaryAppointmentsResponseDto,
  ReadBeneficiaryByCPFResponseDto,
  ReadBeneficiaryReferralsResponseDto,
  ToggleBeneficiaryStatusResponseDto,
  UpdateBeneficiaryRequestDto,
  UpdateBeneficiaryResponseDto
} from '../dtos/beneficiaries';
import { enviroment } from 'src/enviroment';
import { RequiredFields } from '../dtos/beneficiaries/become-beneficiary.dto';

@Injectable()
export class RapidocBeneficiaryService {
  private baseUrl = enviroment.RAPIDOC_BASE_URL;

  private getHeaders() {
    return {
      'clientId': enviroment.RAPIDOC_CLIENT_ID,
      'Authorization': 'Bearer ' + enviroment.RAPIDOC_AUTHORIZATION,
    };
  }

  async becomeBeneficiary(data: BecomeBeneficiaryRequestDto & RequiredFields): Promise<BecomeBeneficiaryResponseDto> {
    const response = await axios.post<BecomeBeneficiaryResponseDto>(
      `${this.baseUrl}/beneficiaries/`,
      [data],
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async requestRoomAccess(uuid: string): Promise<BeneficiaryRequestServiceResponseDto> {
    const response = await axios.get<BeneficiaryRequestServiceResponseDto>(
      `${this.baseUrl}/beneficiaries/${uuid}/request-appointment`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async deactivateBeneficiary(uuid: string): Promise<ToggleBeneficiaryStatusResponseDto> {
    const response = await axios.delete<ToggleBeneficiaryStatusResponseDto>(
      `${this.baseUrl}/beneficiaries/${uuid}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async readBeneficiaries(): Promise<ReadBeneficiariesResponseDto> {
    const response = await axios.get<ReadBeneficiariesResponseDto>(
      `${this.baseUrl}/beneficiaries/`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async readBeneficiaryByCPF(cpf: string): Promise<ReadBeneficiaryByCPFResponseDto> {
    const response = await axios.get<ReadBeneficiaryByCPFResponseDto>(
      `${this.baseUrl}/beneficiaries/${cpf}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async readBeneficiaryReferrals(uuid: string): Promise<ReadBeneficiaryReferralsResponseDto> {
    const response = await axios.get<ReadBeneficiaryReferralsResponseDto>(
      `${this.baseUrl}/beneficiaries/${uuid}/medical-referrals`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async readBeneficiaryAppointments(uuid: string): Promise<ReadBeneficiaryAppointmentsResponseDto> {
    const response = await axios.get<ReadBeneficiaryAppointmentsResponseDto>(
      `${this.baseUrl}/beneficiaries/${uuid}/appointments`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async reactivateBeneficiary(uuid: string): Promise<ToggleBeneficiaryStatusResponseDto> {
    const response = await axios.put<ToggleBeneficiaryStatusResponseDto>(
      `${this.baseUrl}/beneficiaries/${uuid}/reactivate`,
      {},
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async updateBeneficiary(uuid: string, data: UpdateBeneficiaryRequestDto): Promise<UpdateBeneficiaryResponseDto> {
    const response = await axios.put<UpdateBeneficiaryResponseDto>(
      `${this.baseUrl}/beneficiaries/${uuid}`,
      data,
      { headers: this.getHeaders() }
    );
    return response.data;
  }
}