import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { format, parseISO } from "date-fns";
import { BeneficiaryRepository } from "src/Infra/Database/beneficiary.repository";
import {
  BecomeBeneficiaryRequestDto,
  UpdateBeneficiaryRequestDto
} from "src/Infra/Providers/Rapidoc/dtos/beneficiaries";
import {
  RapidocBeneficiaryService
} from "src/Infra/Providers/Rapidoc/services/beneficiaries.service";
import { generateCPF } from "src/utils/generateCPF";
import { generateZipCode } from "src/utils/generateZipCode";
import BeneficiaryInputCoreDto from "./Dtos/BeneficiaryInputCore.dto";

@Injectable()
export class BeneficiaryService {
  constructor(
    private readonly rapidocService: RapidocBeneficiaryService,
    private readonly beneficiaryReadRepository: BeneficiaryRepository
  ) { }

  async createBeneficiary(beneficiary: BeneficiaryInputCoreDto) {
    console.log("dados-debug:"+ beneficiary);
    const cpf = generateCPF();
    const zipCode = generateZipCode();
    const { birthday: birthdayString, ...beneficiaryWithoutBirthday } = beneficiary;
    const beneficiaryCreated = await this.beneficiaryReadRepository.create({
      ...beneficiaryWithoutBirthday,
      birthDate: new Date(),
      cpf,
      zipCode,
      external_user_id: beneficiary.id,
      bi: beneficiary.bi
    })
    const { bi, id, createdAt, updatedAt, external_user_id, birthDate: birthday, ...rest } = beneficiaryCreated;
    const result = await this.rapidocService.becomeBeneficiary({
      ...rest,
      birthday: format(parseISO(birthday.toISOString()), 'yyyy/MM/dd').toString().replaceAll('/', '-'),
    });
    return result;
  }

  async getBeneficiaries() {
    const result = await this.beneficiaryReadRepository.findAll()
    return result;
  }

  async getBeneficiaryById(cpf: string) {
    const result = await this.rapidocService.readBeneficiaryByCPF(cpf);
    return result;
  }

  async getBeneficiaryAppointments(uuid: string) {
    const result = await this.rapidocService.readBeneficiaryAppointments(uuid);
    return result;
  }

  async getBeneficiaryReferrals(uuid: string) {
    const result = await this.rapidocService.readBeneficiaryReferrals(uuid);
    return result;
  }

  async updateBeneficiary(uuid:string, beneficiary:UpdateBeneficiaryRequestDto) {
    const result = await this.rapidocService.updateBeneficiary(uuid, beneficiary);
    return result;
  }

  async requestRoomAccess(userId: string) {

    const beneficiary = await this.beneficiaryReadRepository.findById(userId);

    if (!beneficiary) {
      return new ForbiddenException('Beneficiário não encontrado.');
    }

    const rapidocBeneficiaryByCPF = await this.rapidocService.readBeneficiaryByCPF(beneficiary.cpf) 

    const result = await this.rapidocService.requestRoomAccess(rapidocBeneficiaryByCPF.beneficiary.uuid);
    return result;
  }

  async deactivateBeneficiary(uuid: string) {
    return await this.rapidocService.deactivateBeneficiary(uuid);
  }

  async reactivateBeneficiary(uuid: string) {
    return await this.rapidocService.reactivateBeneficiary(uuid);
  }

}
