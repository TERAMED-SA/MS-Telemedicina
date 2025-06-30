import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SubscriptionEnvelopeDTO } from '../dtos/dto';
import { SubscriptionEnvelopeSchema } from '../dtos/schema2';
import { SubscriptionReadRepository } from 'src/Infra/Database/subscriptions.repository';

@Injectable()
export class SubscriptionConsumerService implements OnModuleInit {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly subscriptionRepository: SubscriptionReadRepository
  ) {}

  async onModuleInit() {
    this.amqpConnection.createSubscriber(
      async (msg: SubscriptionEnvelopeDTO) => {
        console.log('📩 Subscription message received:', msg);

        const result = SubscriptionEnvelopeSchema.safeParse(msg);
        if (!result.success) {
          console.error('❌ Mensagem inválida:', result.error.format());
          return;
        }

        const subscription = result.data.Message.Content;

        try {
          await this.subscriptionRepository.create({
            id: subscription.Id,
            packageId: subscription.PackageId,
            userId: subscription.UserId ?? null,
            status: String(subscription.Status),
            startDate: new Date(subscription.StartDate),
            endDate: subscription.EndDate ? new Date(subscription.EndDate) : null,
            renewsAt: subscription.RenewsAt ? new Date(subscription.RenewsAt) : null,
            canceledAt: subscription.CanceledAt ? new Date(subscription.CanceledAt) : null,
            paymentMethod: String(subscription.PaymentMethod),
            paymentMethodDetails: subscription.PaymentMethodDetails ?? null,
            paymentTransactionId: subscription.PaymentTransactionId ?? null,
            paymentTransactionStatus: subscription.PaymentTransactionStatus ?? null,
            externalRef: subscription.ExternalRef ?? null,
            createdAt: new Date(subscription.CreatedAt),
            updatedAt: new Date(subscription.UpdatedAt),
          });

          console.log(`✅ Assinatura ${subscription.Id} salva com sucesso.`);
        } catch (error) {
          console.error('💥 Erro ao salvar a assinatura:', error);
        }
      },
      {
        queue: 'subscription'
      },
      'handleSubscriptionMessage'
    );
  }
}
