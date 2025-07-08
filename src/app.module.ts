import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { BeneficiaryModule } from './Modules/Beneficiary/beneficiary.module';
import { RedisProviderModule } from './Infra/Providers/Redis/redis.module';
import { PrismaModule } from './Infra/Providers/Prisma/prisma.module';
import { RabbitMQModule } from './Infra/Providers/RabbitMQ/rabbitmq.module';
import { OtpModule } from './Modules/Otp/otp.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    PrismaModule,
    BeneficiaryModule,
    RedisProviderModule,
    RabbitMQModule,
    OtpModule
  ]
})

export class AppModule { }