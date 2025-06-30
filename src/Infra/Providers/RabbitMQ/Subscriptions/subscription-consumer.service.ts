import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SubscriptionResponseDTO } from '../dtos/subscription.dto';
import { ValidateDto } from '../helpers/validate-subscription-message-dto';
import { SubscriptionResponseSchema } from '../dtos/schema';
import { PrismaClient } from 'src/Infrastructure/Database/generated';

interface ISubscriptionBrokerMessage {
  type: 'create:subscription' | 'update:subscription' | 'cancel:subscription' | 'activate:subscription';
  data: SubscriptionResponseDTO;
}

@Injectable()
export class SubscriptionConsumerService implements OnModuleInit {
  private prisma = new PrismaClient();

  constructor(private readonly amqpConnection: AmqpConnection) { }

  async onModuleInit() {
    this.amqpConnection.createSubscriber(
      async (msg: ISubscriptionBrokerMessage) => {
        const result = ValidateDto<ISubscriptionBrokerMessage>(
          msg,
          SubscriptionResponseSchema
        );

        if (!result.isValid && !result.data) {
          console.error('Invalid message received:', result.error);
          return;
        }

        if (!result.data) {
          console.error('No data found in message:', msg);
          return;
        }

        const { data, type } = result.data;

        if (type === 'create:subscription') {
          const { package: _package, ...subscriptionData } = data;
          await this.prisma.subscription.create({
            data: {
              ...subscriptionData,
              paymentMethodDetails: subscriptionData.paymentMethodDetails
                ? JSON.stringify(subscriptionData.paymentMethodDetails)
                : undefined
            }
          });
        }

        if (type === 'update:subscription' && data.id) {
          const { package: _package, ...subscriptionData } = data;
          await this.prisma.subscription.update({
            where: { id: data.id },
            data: {
              ...subscriptionData,
              paymentMethodDetails: subscriptionData.paymentMethodDetails
                ? JSON.stringify(subscriptionData.paymentMethodDetails)
                : undefined
            }
          });
        }

        if (type === 'cancel:subscription' && data.id) {
          await this.prisma.subscription.update({
            where: { id: data.id },
            data: {
              status: 'CANCELED',
              canceledAt: new Date().toISOString()
            }
          });
        }

        if (type === 'activate:subscription' && data.id) {
          await this.prisma.subscription.update({
            where: { id: data.id },
            data: {
              status: 'ACTIVE'
            }
          });
        }
      },
      { 
        exchange: 'amq.direct', 
        routingKey: 'create:subscription', 
        queue: 'queue:package' 
      },
      'handleSubscriptionMessage'
    );
  }
}