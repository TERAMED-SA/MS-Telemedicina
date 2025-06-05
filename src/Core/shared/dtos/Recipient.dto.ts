// src/modules/recipient/dtos/recipient.dtos.ts
export enum PaymentType {
  RECORRENTE = "RECORRENTE",
  CONSULTA = "CONSULTA",
}

export enum ServiceType {
  CLINICO = "CLINICO",
  PSICOLOGIA = "PSICOLOGIA",
  CLINICO_PSICOLOGIA = "CLINICO_PSICOLOGIA",
  CLINICO_ESPECIALISTA = "CLINICO_ESPECIALISTA",
  CLINICO_ESPECIALISTAS_PSICOLOGIA = "CLINICO_ESPECIALISTAS_PSICOLOGIA",
}

export class OutRecipientDto {
    id: number;
    externalUserId: number;
    uuid: string;
    name: string;
    cpf: string;
    birthday: string; // ISO 8601 (YYYY-MM-DD)
    phone: string;
    email: string;
    zipCode: string;
    address: string;
    city: string;
    state: string;
    paymentType?: PaymentType = PaymentType.RECORRENTE;
    serviceType?: ServiceType = ServiceType.CLINICO;
    holder?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    isActive: boolean;
}

export class InRecipientDto {
    externalUserId: number;
    name: string;
    cpf: string;
    birthday: string; // ISO 8601 (YYYY-MM-DD)
    phone: string;
    email: string;
    zipCode: string;
    address: string;
    city: string;
    state: string;
    paymentType?: PaymentType = PaymentType.RECORRENTE;
    serviceType?: ServiceType = ServiceType.CLINICO;
    holder?: string;
    isActive: boolean = true;
}