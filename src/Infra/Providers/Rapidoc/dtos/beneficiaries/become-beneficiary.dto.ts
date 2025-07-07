import { RapidocResponseDto } from "./response.dto";

export type BecomeBeneficiaryRequestDto = {
  name: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
};

export type RequiredFields = {
  cpf: string;
  zipCode: string;
}

type Beneficiary = {
  cpf: string,
  uuid: string
}

export type BecomeBeneficiaryResponseDto = {
  beneficiaries: Beneficiary[]
} & RapidocResponseDto