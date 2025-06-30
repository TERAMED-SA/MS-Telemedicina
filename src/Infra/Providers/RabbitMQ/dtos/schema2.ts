import { z } from 'zod';

export const SubscriptionFeatureSchema = z.object({
  Id: z.string(),
  PackageId: z.string(),
  Feature: z.number(),
  Package: z.object({
    $ref: z.string(),
  }),
});

export const PackageSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Description: z.string(),
  Price: z.number(),
  Currency: z.string(),
  BillingPeriod: z.string(),
  Features: z.object({
    $id: z.string(),
    $values: z.array(SubscriptionFeatureSchema),
  }),
  IsActive: z.boolean(),
  CreatedAt: z.string().datetime(),
  UpdatedAt: z.string().datetime(),
});

export const SubscriptionContentSchema = z.object({
  $id: z.string(),
  Id: z.string(),
  PackageId: z.string(),
  UserId: z.string(),
  Status: z.number(),
  StartDate: z.string().datetime(),
  EndDate: z.string().datetime(),
  RenewsAt: z.string().datetime().nullable(),
  CanceledAt: z.string().datetime().nullable(),
  PaymentMethod: z.number(),
  PaymentMethodDetails: z.string().nullable(),
  PaymentTransactionId: z.string().nullable(),
  PaymentTransactionStatus: z.string().nullable(),
  ExternalRef: z.string().nullable(),
  CreatedAt: z.string().datetime(),
  UpdatedAt: z.string().datetime(),
  Package: PackageSchema,
});

export const SubscriptionMessageSchema = z.object({
  $id: z.string(),
  Id: z.string(),
  Content: SubscriptionContentSchema,
  Timestamp: z.string().datetime(),
});

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

export const SubscriptionEnvelopeSchema = z.object({
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
  Message: SubscriptionMessageSchema,
  ExpirationTime: z.string().nullable(),
  SentTime: z.string().datetime(),
  Headers: z.record(z.any()),
  Host: HostSchema,
});
