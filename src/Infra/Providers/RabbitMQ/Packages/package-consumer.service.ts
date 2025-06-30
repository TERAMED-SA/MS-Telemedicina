import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PackageBrokerEnvelope } from '../dtos/dto';
import { PackageBrokerEnvelopeSchema } from '../dtos/schema';
import { PrismaClient } from 'src/Infrastructure/Database/generated';


@Injectable()
export class PackageConsumerService implements OnModuleInit {

  constructor(private readonly amqpConnection: AmqpConnection) { }

  async onModuleInit() {
    this.amqpConnection.createSubscriber(
      async (msg: PackageBrokerEnvelope) => {
        const prisma = new PrismaClient();
        console.log('Received package message:', msg);

        const result = PackageBrokerEnvelopeSchema.safeParse(msg)

        if (!result.success) {
          console.error("Mensagem inválida:", result.error.format());
        } else {
          const validMessage = result.data;
          console.log("Mensagem válida:", validMessage.Message.Content.Name);
          return;
        }
       /*  if (!result.isValid && !result.data) {
          console.error('Invalid package message received:', result.error);
          return;
        }

        if (!result.data) {
          console.error('No data found in package message:', msg);
          return;
        }
                const { data, type } = result.data;
        
                if (type === 'create:package') {
                  const { id, name, description, price, currency, billingPeriod, features, isActive, createdAt, updatedAt } = data;
                  if (!id || !name || !description || price === undefined || !currency || !billingPeriod || !features || isActive === undefined || !createdAt || !updatedAt) {
                    console.error('Package creation failed: missing required fields');
                    return;
                  }
                  await this.prisma.package.create({
                    data: { id, name, description, price, currency, billingPeriod, features, isActive, createdAt, updatedAt }
                  });
                }
        
                if (type === 'update:package' && data.id) {
                  await this.prisma.package.update({
                    where: { id: data.id },
                    data: {
                      ...data
                    }
                  });
                }
        
                if (type === 'deactivate:package' && data.id) {
                  await this.prisma.package.update({
                    where: { id: data.id },
                    data: { isActive: false }
                  });
                } */
      },
      {
        queue: 'package'
      },
      'handlePackageMessage'
    );
  }
}