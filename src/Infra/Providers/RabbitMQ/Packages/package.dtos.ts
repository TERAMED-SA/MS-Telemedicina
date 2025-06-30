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