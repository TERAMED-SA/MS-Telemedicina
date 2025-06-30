export interface PackageBrokerEnvelope {
  $id: string;
  MessageId: string;
  RequestId: string | null;
  CorrelationId: string | null;
  ConversationId: string;
  InitiatorId: string | null;
  SourceAddress: string;
  DestinationAddress: string;
  ResponseAddress: string | null;
  FaultAddress: string | null;
  MessageType: string[];
  Message: {
    $id: string;
    Id: string;
    Content: {
      $id: string;
      Id: string;
      Name: string;
      Description: string;
      Price: number;
      Currency: string;
      BillingPeriod: 'MONTHLY' | 'YEARLY' | string;
      Features: Record<string, any>; 
      IsActive: boolean;
      CreatedAt: string;
      UpdatedAt: string;
    };
    Timestamp: string;
  };
  ExpirationTime: string | null;
  SentTime: string;
  Headers: Record<string, any>;
  Host: {
    $id: string;
    MachineName: string;
    ProcessName: string;
    ProcessId: number;
    Assembly: string;
    AssemblyVersion: string;
    FrameworkVersion: string;
    MassTransitVersion: string;
    OperatingSystemVersion: string;
  };
}

export interface SubscriptionFeatureDTO {
  Id: string;
  PackageId: string;
  Feature: number;
  Package: {
    $ref: string;
  };
}

export interface PackageDTO {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  Currency: string;
  BillingPeriod: string;
  Features: {
    $id: string;
    $values: SubscriptionFeatureDTO[];
  };
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface SubscriptionContentDTO {
  $id: string;
  Id: string;
  PackageId: string;
  UserId: string;
  Status: number;
  StartDate: string;
  EndDate: string;
  RenewsAt: string | null;
  CanceledAt: string | null;
  PaymentMethod: number;
  PaymentMethodDetails: string | null;
  PaymentTransactionId: string | null;
  PaymentTransactionStatus: string | null;
  ExternalRef: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  Package: PackageDTO;
}

export interface SubscriptionMessageDTO {
  $id: string;
  Id: string;
  Content: SubscriptionContentDTO;
  Timestamp: string;
}

export interface HostInfo {
  $id: string;
  MachineName: string;
  ProcessName: string;
  ProcessId: number;
  Assembly: string;
  AssemblyVersion: string;
  FrameworkVersion: string;
  MassTransitVersion: string;
  OperatingSystemVersion: string;
}

export interface SubscriptionEnvelopeDTO {
  $id: string;
  MessageId: string;
  RequestId: string | null;
  CorrelationId: string | null;
  ConversationId: string;
  InitiatorId: string | null;
  SourceAddress: string;
  DestinationAddress: string;
  ResponseAddress: string | null;
  FaultAddress: string | null;
  MessageType: string[];
  Message: SubscriptionMessageDTO;
  ExpirationTime: string | null;
  SentTime: string;
  Headers: Record<string, any>;
  Host: HostInfo;
}

