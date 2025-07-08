import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
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

@Injectable()
export class BeneficiaryService {
  constructor(
    private readonly rapidocService: RapidocBeneficiaryService,
    private readonly beneficiaryReadRepository: BeneficiaryRepository
  ) { }

  async createBeneficiary(beneficiary: BecomeBeneficiaryRequestDto & { id: string, bi: string }) {
    const cpf = generateCPF();
    const zipCode = generateZipCode();

    const beneficiaryCreated = await this.beneficiaryReadRepository.create({
      ...beneficiary,
      birthDate: new Date(beneficiary.birthday),
      cpf,
      zipCode,
      external_user_id: beneficiary.id,
      bi: beneficiary.bi
    })

    const { bi, id, createdAt, updatedAt, birthDate: birthday, ...rest } = beneficiaryCreated;

    const result = await this.rapidocService.becomeBeneficiary({
      ...rest,
      birthday: birthday.toISOString(),
    });

    return result;
  }

  async getBeneficiaries() {

    const result = await this.rapidocService.readBeneficiaries();
    if (!result.success) {
      return new ForbiddenException('Não foi possível obter a lista de beneficiários.');
    }
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

  async updateBeneficiary(uuid: string, beneficiary: UpdateBeneficiaryRequestDto) {
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