import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Providers/Prisma/prisma.service';
import { Package } from '@prisma/client';

@Injectable()
export class PackageReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Package): Promise<Package> {
    return this.prisma.package.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async update(id: string, data: Partial<Omit<Package, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Package> {
    return this.prisma.package.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Package[]> {
    return this.prisma.package.findMany();
  }

  async findById(id: string): Promise<Package | null> {
    return this.prisma.package.findUnique({ where: { id } });
  }

  async findActive(): Promise<Package[]> {
    return this.prisma.package.findMany({ where: { isActive: true } });
  }

  async findByName(name: string): Promise<Package[]> {
    return this.prisma.package.findMany({ where: { name: { contains: name, mode: 'insensitive' } } });
  }

  async findByBillingPeriod(billingPeriod: string): Promise<Package[]> {
    return this.prisma.package.findMany({ where: { billingPeriod } });
  }

  async findByFeature(feature: string): Promise<Package[]> {
    return this.prisma.package.findMany({
      where: {
        features: { has: feature }
      }
    });
  }
}