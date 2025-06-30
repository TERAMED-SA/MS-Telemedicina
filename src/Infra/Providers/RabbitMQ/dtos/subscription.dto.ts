export interface PackageResponseDTO {
  id?: string;
  name?: string;
  description?: string;
  price: number;
  currency: string;
  billingPeriod: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE' | 'CANCELED' | 'EXPIRED' | 'PENDING';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANK_TRANSFER' | 'PAYPAL' | 'PIX' | 'OTHER';

export interface SubscriptionResponseDTO {
  id: string;
  packageId: string;
  userId: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  renewsAt: string;
  canceledAt: string;
  paymentMethod: PaymentMethod;
  paymentMethodDetails: Record<string, unknown>;
  paymentTransactionId: string;
  paymentTransactionStatus?: string;
  externalRef: string;
  createdAt: string;
  updatedAt: string;
  package: PackageResponseDTO;
}