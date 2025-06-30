import { Injectable } from '@nestjs/common';
import { HttpClient } from '../../http/config';
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
import { Observable } from 'rxjs';

@Injectable()
export class RapidocBeneficiaryService {
  constructor(private readonly httpClient: HttpClient) { }

  async becomeBeneficiary(data: BecomeBeneficiaryRequestDto):
    Promise<
      Observable<BecomeBeneficiaryResponseDto>
    > {
    return this.httpClient.post<BecomeBeneficiaryResponseDto>(`/`, [data]);
  }

  async requestRoomAccess(uuid: string):
    Promise<
      Observable<BeneficiaryRequestServiceResponseDto>
    > {
    return this.httpClient.get<BeneficiaryRequestServiceResponseDto>(`/${uuid}/request-appointment`);
  }

  async deactivateBeneficiary(uuid: string):
    Promise<
      Observable<ToggleBeneficiaryStatusResponseDto>
    > {
    return this.httpClient.delete<ToggleBeneficiaryStatusResponseDto>(`/${uuid}`);
  }

  async readBeneficiaries():
    Promise<
      Observable<ReadBeneficiariesResponseDto>
    > {
    return this.httpClient.get<ReadBeneficiariesResponseDto>(`/`);
  }

  async readBeneficiaryByCPF(cpf: string):
    Promise<
      Observable<ReadBeneficiaryByCPFResponseDto>
    > {
    return this.httpClient.get<ReadBeneficiaryByCPFResponseDto>(`/${cpf}`);
  }

  async readBeneficiaryReferrals(uuid: string):
    Promise<
      Observable<ReadBeneficiaryReferralsResponseDto>
    > {
    return this.httpClient.get<ReadBeneficiaryReferralsResponseDto>(`/${uuid}/medical-referrals`);
  }

  async readBeneficiaryAppointments(uuid: string):
    Promise<
      Observable<ReadBeneficiaryAppointmentsResponseDto>
    > {
    return this.httpClient.get<ReadBeneficiaryAppointmentsResponseDto>(`/${uuid}/appointments`);
  }

  async reactivateBeneficiary(uuid: string):
    Promise<
      Observable<ToggleBeneficiaryStatusResponseDto>
    > {
    return this.httpClient.put<ToggleBeneficiaryStatusResponseDto>(`/${uuid}/reactivate`);
  }

  async updateBeneficiary(uuid: string, data: UpdateBeneficiaryRequestDto):
    Promise<
      Observable<UpdateBeneficiaryResponseDto>
    > {
    return this.httpClient.put<UpdateBeneficiaryResponseDto>(`/${uuid}`, data);
  }
}