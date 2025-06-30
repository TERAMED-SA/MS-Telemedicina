import { forwardRef, Module } from '@nestjs/common';
import { PackageReadRepository } from 'src/Infra/Database/package.repository';
import { PrismaModule } from 'src/Infra/Providers/Prisma/prisma.module';
import { PackageConsumerService } from './package.service';
import { RabbitMQModule } from '../rabbitmq.module';


@Module({
  imports: [
    PrismaModule,
    forwardRef(() => RabbitMQModule),
  ],
  providers: [PackageConsumerService, PackageReadRepository],
  exports: [PackageConsumerService, PackageReadRepository],
})
export class PackageModule {}