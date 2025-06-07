import { RapidocResponseDto } from "./response.dto";

export type UpdateBeneficiaryRequestDto = {
  name: string;
  birthday: string; 
  phone: string;
  email: string;
  zipCode: string;
  address: string;
  city: string;
  state: string;
  paymentType: string;   
  serviceType: string;   
};

export type UpdateBeneficiaryResponseDto = {
  beneficiary: {
    name: string;
    uuid: string;
    cpf: string;
    birthday: string;
    phone: string;
    email: string;
    zipCode: string;
    address: string;
    city: string;
    state: string;
    paymentType: string;
    serviceType: string;
    holder: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
} & RapidocResponseDto;