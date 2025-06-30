import { Injectable } from '@nestjs/common';
import { PrismaClient, Subscription } from 'src/Infrastructure/Database/generated';

@Injectable()
export class SubscriptionReadRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany();
  }

  async findById(id: string): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({ where: { userId } });
  }

  async findByPackageId(packageId: string): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({ where: { packageId } });
  }

  async findActiveByUserId(userId: string): Promise<Subscription | null> {
    return this.prisma.subscription.findFirst({
      where: { userId, status: 'ACTIVE' }
    });
  }

  async findByStatus(status: string): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({ where: { status } });
  }

  async findByDateRange(start: Date, end: Date): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      where: {
        startDate: { gte: start },
        endDate: { lte: end }
      }
    });
  }

  async findAllWithPackage(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      include: { package: true }
    });
  }

  async findByExternalRef(externalRef: string): Promise<Subscription | null> {
    return this.prisma.subscription.findFirst({ where: { externalRef } });
  }
}