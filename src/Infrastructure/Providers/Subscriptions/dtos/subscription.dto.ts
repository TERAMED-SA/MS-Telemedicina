type SubscriptionStatus = 'ACTIVE' | 'INACTIVE' | 'CANCELED' | 'EXPIRED' | 'PENDING';
type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANK_TRANSFER' | 'PAYPAL' | 'PIX' | string;

export type SubscriptionFeature =
  | 'consultation'
  | 'telemedicine'
  | 'reports'
  | 'video_calls'
  | 'discounts'
  | 'priority_support';

type Plan = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  currency: 'USD' | 'AOA' | 'BRL' | string;
  billingPeriod: 'MONTHLY' | 'YEARLY'; 

  features: string[];

  isActive: boolean;

  maxAppointments?: number | null;

  createdAt: string;
  updatedAt: string;
};

export type SubscriptionResponseDto = {
  id: string;

  planId: string;

  userId: string; 

  status: SubscriptionStatus;

  startDate: string;       
  endDate?: string | null;  
  renewsAt?: string | null;
  canceledAt?: string | null; 

  paymentMethod?: PaymentMethod | null;

  paymentMethodDetails?: Record<string, any> | null;

  paymentTransactionId?: string | null;

  paymentTransactionStatus?: string | null;
  externalRef?: string | null; 

  createdAt: string;
  updatedAt: string;

  plan: Plan;
};
