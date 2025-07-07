import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Providers/Prisma/prisma.service';
import { Beneficiary } from '@prisma/client';

@Injectable()
export class BeneficiaryRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: Omit<Beneficiary, 'id' | 'createdAt' | 'updatedAt'>): Promise<Beneficiary> {
    return this.prisma.beneficiary.create({
      data,
    });
  }

  async findByPhone(phone: string): Promise<Beneficiary | null> {
    return this.prisma.beneficiary.findUnique({ where: { phone } });
  }

  async findAll(): Promise<Beneficiary[]> {
    return this.prisma.beneficiary.findMany();
  }

  async findById(id: string): Promise<Beneficiary | null> {
    return this.prisma.beneficiary.findUnique({ where: { id } });
  }

  async findByCpf(cpf: string): Promise<Beneficiary | null> {
    return this.prisma.beneficiary.findUnique({ where: { cpf } });
  }

  async findByEmail(email: string): Promise<Beneficiary | null> {
    return this.prisma.beneficiary.findUnique({ where: { email: [email] } });
  }

  async update(id: string, data: Partial<Omit<Beneficiary, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Beneficiary> {
    return this.prisma.beneficiary.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Beneficiary> {
    return this.prisma.beneficiary.delete({ where: { id } });
  }
}