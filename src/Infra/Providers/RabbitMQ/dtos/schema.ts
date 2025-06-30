import { z } from 'zod';

export const HostSchema = z.object({
  $id: z.string(),
  MachineName: z.string(),
  ProcessName: z.string(),
  ProcessId: z.number(),
  Assembly: z.string(),
  AssemblyVersion: z.string(),
  FrameworkVersion: z.string(),
  MassTransitVersion: z.string(),
  OperatingSystemVersion: z.string(),
});

export const ContentSchema = z.object({
  $id: z.string(),
  Id: z.string(),
  Name: z.string(),
  Description: z.string(),
  Price: z.number(),
  Currency: z.string(),
  BillingPeriod: z.enum(['MONTHLY', 'YEARLY']).or(z.string()),
  Features: z.record(z.any()), // substitua se souber os campos de Features
  IsActive: z.boolean(),
  CreatedAt: z.string().datetime(),
  UpdatedAt: z.string().datetime(),
});

export const MessageSchema = z.object({
  $id: z.string(),
  Id: z.string(),
  Content: ContentSchema,
  Timestamp: z.string().datetime(),
});

export const PackageBrokerEnvelopeSchema = z.object({
  $id: z.string(),
  MessageId: z.string(),
  RequestId: z.string().nullable(),
  CorrelationId: z.string().nullable(),
  ConversationId: z.string(),
  InitiatorId: z.string().nullable(),
  SourceAddress: z.string(),
  DestinationAddress: z.string(),
  ResponseAddress: z.string().nullable(),
  FaultAddress: z.string().nullable(),
  MessageType: z.array(z.string()),
  Message: MessageSchema,
  ExpirationTime: z.string().nullable(),
  SentTime: z.string().datetime(),
  Headers: z.record(z.any()),
  Host: HostSchema,
});


export const SubscriptionStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'CANCELED', 'EXPIRED', 'PENDING']);
export const PaymentMethodEnum = z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'PIX', 'OTHER']);

export const SubscriptionResponseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  userId: z.string(),
  status: SubscriptionStatusEnum,
  startDate: z.string(),
  endDate: z.string(),
  renewsAt: z.string(),
  canceledAt: z.string(),
  paymentMethod: PaymentMethodEnum,
  paymentMethodDetails: z.record(z.unknown()),
  paymentTransactionId: z.string(),
  paymentTransactionStatus: z.string(),
  externalRef: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  package: PackageBrokerEnvelopeSchema,
});