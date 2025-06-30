import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PackageReadRepository } from 'src/Infra/Database/package.repository';
import { Prisma } from '@prisma/client';
import { PackageBrokerEnvelope } from './package.dtos';
import { PackageBrokerEnvelopeSchema } from './package.schema';


@Injectable()
export class PackageConsumerService implements OnModuleInit {

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly packageRepository: PackageReadRepository
  ) { }

  async onModuleInit() {
    this.amqpConnection.createSubscriber(
      async (msg: PackageBrokerEnvelope) => {
        const result = PackageBrokerEnvelopeSchema.safeParse(msg);

        if (!result.success) {
          console.error("Mensagem inválida:", result.error.format());
        } else {
          const validMessage = result.data.Message;

          const content = validMessage.Content;
          try {

            console.log(content.Features)
            const features = Array.isArray(content.Features)
              ? content.Features.flatMap(f =>
                typeof f === 'string'
                  ? [f]
                  : typeof f.Feature === 'string'
                    ? [f.Feature]
                    : []
              )
              : [];
            await this.packageRepository.create({
              id: content.Id,
              name: content.Name,
              price: new Prisma.Decimal(content.Price),
              currency: content.Currency,
              billingPeriod: content.BillingPeriod,
              features,
              isActive: content.IsActive,
              createdAt: new Date(content.CreatedAt),
              updatedAt: new Date(content.UpdatedAt),
              description: null
            });
            console.log('Pacote cadastrado com sucesso!');
          } catch (err) {
            console.error('Erro ao cadastrar pacote:', err);
          }
        }
      },
      {
        queue: 'package'
      },
      'handlePackageMessage'
    );
  }
}