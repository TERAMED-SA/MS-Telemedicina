import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { firstValueFrom } from "rxjs";
import { BecomeBeneficiaryRequestDto, ReadBeneficiariesResponseDto, ReadBeneficiaryAppointmentsResponseDto, ReadBeneficiaryByCPFResponseDto, ReadBeneficiaryReferralsResponseDto, UpdateBeneficiaryRequestDto } from "src/Infrastructure/Providers/Rapidoc/dtos/beneficiaries";
import { RapidocBeneficiaryService } from "src/Infrastructure/Providers/Rapidoc/services/beneficiaries.service";
import { RapidocSchedulingService } from "src/Infrastructure/Providers/Rapidoc/services/scheduling.service";

const CACHE_TTL = 1800; //30 minutos

@Injectable()
export class BeneficiaryService {
  constructor(
    private readonly rapidocService: RapidocBeneficiaryService,
    private readonly rapidocSchedulingService: RapidocSchedulingService,
    @Inject("REDIS_CLIENT") private readonly redis: Redis
  ) { }

  async createBeneficiary(beneficiary: BecomeBeneficiaryRequestDto) {
    const observable = await this.rapidocService.becomeBeneficiary(beneficiary);
    const result = await firstValueFrom(observable);

    await this.redis.del('beneficiaries:all');
    return result;
  }

  async getBeneficiaries() {
    const cacheKey = 'beneficiaries:all';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as ReadBeneficiariesResponseDto;

    const observable = await this.rapidocService.readBeneficiaries();
    const result = await firstValueFrom(observable);
    await this.redis.set(cacheKey, JSON.stringify(result));
    return result;
  }

  async getBeneficiaryById(cpf: string) {
    const cacheKey = `beneficiary:cpf:${cpf}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as ReadBeneficiaryByCPFResponseDto;

    const observable = await this.rapidocService.readBeneficiaryByCPF(cpf);
    const result = await firstValueFrom(observable);
    await this.redis.set(cacheKey, JSON.stringify(result));
    return result;
  }

  async getBeneficiaryAppointments(uuid: string) {
    const cacheKey = `beneficiary:${uuid}:appointments`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as ReadBeneficiaryAppointmentsResponseDto;

    const observable = await this.rapidocService.readBeneficiaryAppointments(uuid);
    const result = await firstValueFrom(observable);
    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
    return result;
  }

  async getBeneficiaryReferrals(uuid: string) {
    const cacheKey = `beneficiary:${uuid}:referrals`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as ReadBeneficiaryReferralsResponseDto;

    const observable = await this.rapidocService.readBeneficiaryReferrals(uuid);
    const result = await firstValueFrom(observable);
    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
    return result;
  }

  async updateBeneficiary(uuid: string, beneficiary: UpdateBeneficiaryRequestDto) {
    const observable = await this.rapidocService.updateBeneficiary(uuid, beneficiary);
    const result = await firstValueFrom(observable);

    await this.redis.del('beneficiaries:all');
    await this.redis.del(`beneficiary:cpf:${result.beneficiary.cpf}`);
    
    return result;
  }

  async requestRoomAccess(uuid: string) {
    const cacheKey = `beneficiary:${uuid}:appointments`;
    const observable = await this.rapidocService.requestRoomAccess(uuid);
    await this.redis.del(cacheKey)
    return await firstValueFrom(observable)
  }

  async deactivateBeneficiary(uuid: string) {
    const observable = await this.rapidocService.deactivateBeneficiary(uuid);
    return await firstValueFrom(observable)
  }

  async reactivateBeneficiary(uuid: string) {
    const observable = await this.rapidocService.reactivateBeneficiary(uuid);
    return await firstValueFrom(observable)
  }

  async readSpecialities() {
    const cacheKey = 'specialities:all';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const observable = await this.rapidocSchedulingService.readSpecialities();
    const result = await firstValueFrom(observable);
    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
    return result;
  }

  async readAvailabilityBySpeciality(specialityId: string) {
    const cacheKey = `speciality:${specialityId}:availability`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const observable = await this.rapidocSchedulingService.readAvailabilityBySpeciality(specialityId);
    const result = await firstValueFrom(observable);
    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
    return result;
  }

  async readSchedulingByBeneficiary(uuid: string) {
    const cacheKey = `beneficiary:${uuid}:schedulings`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const observable = await this.rapidocSchedulingService.readSchedulingsByBeneficiary(uuid);
    const result = await firstValueFrom(observable);
    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
    return result;
  }

  async scheduleAppointment(appointmentData: any) {
    const observable = await this.rapidocSchedulingService.scheduleAppointment(appointmentData);
    return await firstValueFrom(observable)
  }
}