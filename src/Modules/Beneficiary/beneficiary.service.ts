import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { BeneficiaryRepository } from "src/Infra/Database/beneficiary.repository";
import {
  SubscriptionReadRepository
} from "src/Infra/Database/subscriptions.repository";
import {
  BecomeBeneficiaryRequestDto,
  ReadBeneficiariesResponseDto,
  ReadBeneficiaryAppointmentsResponseDto,
  ReadBeneficiaryByCPFResponseDto,
  ReadBeneficiaryReferralsResponseDto,
  UpdateBeneficiaryRequestDto
} from "src/Infra/Providers/Rapidoc/dtos/beneficiaries";
import {
  RapidocBeneficiaryService
} from "src/Infra/Providers/Rapidoc/services/beneficiaries.service";
import {
  RapidocSchedulingService
} from "src/Infra/Providers/Rapidoc/services/scheduling.service";
import { generateCPF } from "src/utils/generateCPF";
import { generateZipCode } from "src/utils/generateZipCode";

const CACHE_TTL = 1800;

@Injectable()
export class BeneficiaryService {
  constructor(
    private readonly rapidocService: RapidocBeneficiaryService,
    private readonly rapidocSchedulingService: RapidocSchedulingService,
    private readonly subscriptionReadRepository: SubscriptionReadRepository,
    private readonly beneficiaryReadRepository: BeneficiaryRepository,
    @Inject("REDIS_CLIENT") private readonly redis: Redis
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

    await this.redis.del('beneficiaries:all');
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

    await this.redis.del('beneficiaries:all');
    await this.redis.del(`beneficiary:cpf:${result.beneficiary.cpf}`);

    return result;
  }

  async confirmBeneficiarywithOTP() {

  }

  async requestRoomAccess(phoneNumber: string) {

    if (!phoneNumber || phoneNumber.length < 8) {
      return new ForbiddenException('Número de telefone inválido.');
    }

    const beneficiary = await this.beneficiaryReadRepository.findByPhone(phoneNumber);

    if (!beneficiary) {
      return new ForbiddenException('Beneficiário não encontrado.');
    }

    //TODO: Verificar se tem subscricao ativa com acesso a telemedicina
    //TODO: Fazer pedido na Rapidoc para acesso a sala com o uuid do beneficiário

    const result = await this.rapidocService.requestRoomAccess(beneficiary.id);
    return result;
  }

  async deactivateBeneficiary(uuid: string) {
    return await this.rapidocService.deactivateBeneficiary(uuid);
  }

  async reactivateBeneficiary(uuid: string) {
    return await this.rapidocService.reactivateBeneficiary(uuid);
  }

  async readSpecialities() {
   
    const result = await this.rapidocSchedulingService.readSpecialities();
    return result;
  }

  async readAvailabilityBySpeciality(specialityId: string) {
    const result = await this.rapidocSchedulingService.readAvailabilityBySpeciality(specialityId);
    return result;
  }

  async readSchedulingByBeneficiary(uuid: string) {
    const result = await this.rapidocSchedulingService.readSchedulingsByBeneficiary(uuid);
    return result;
  }

  async scheduleAppointment(appointmentData: any, userId: string) {
    const subscription = await this.subscriptionReadRepository.findActiveByUserId(userId);

    if (!subscription) {
      return new ForbiddenException('Usuário não possui assinatura ativa.');
    }

    return await this.rapidocSchedulingService.scheduleAppointment(appointmentData);
  }
}