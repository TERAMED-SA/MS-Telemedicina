import { Injectable } from "@nestjs/common";
import { HttpClient } from "../../http/config";
import { firstValueFrom, Observable } from "rxjs";
import { ReadAvailabilityBySpecialtiesResponseDto, ReadBeneficiarySchedulingResponse, ReadSpecialitiesResponseDto } from "../dtos/schedulings";
import { ReadBeneficiaryAppointmentsResponseDto } from "../dtos/beneficiaries";
import { RapidocResponseDto } from "../dtos/beneficiaries/response.dto";

@Injectable()
export class RapidocSchedulingService {
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  async readSpecialities(): Promise<Observable<ReadSpecialitiesResponseDto>> {
    const result = this.httpClient.get<ReadSpecialitiesResponseDto>(`/specialities`);
    return result;
  }

  async readAvailabilityBySpeciality(specialityId: string):
    Promise<
      Observable<ReadAvailabilityBySpecialtiesResponseDto>
    > {
    return this.httpClient.get<ReadAvailabilityBySpecialtiesResponseDto>(`/specialities/${specialityId}/availability`);
  }

  async scheduleAppointment(data: any):
    Promise<
      Observable<ReadBeneficiaryAppointmentsResponseDto>
    > {
    return this.httpClient.post<ReadBeneficiaryAppointmentsResponseDto>(`/appointments`, data);
  }

  async readSchedulingsByBeneficiary(beneficiaryUuid: string):
    Promise<
      Observable<ReadBeneficiarySchedulingResponse>
    > {
    return this.httpClient.get<ReadBeneficiarySchedulingResponse>(`/beneficiaries/${beneficiaryUuid}/appointments`);
  }
}