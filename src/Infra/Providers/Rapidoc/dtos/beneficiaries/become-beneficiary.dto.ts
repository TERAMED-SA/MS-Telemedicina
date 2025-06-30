import { RapidocResponseDto } from "./response.dto";

export type BecomeBeneficiaryRequestDto = {
  name: string;
  cpf: string;
  birthday: string;
  phone: string;
  email: string;
  zipCode: string;
  address: string;
  city: string;
  state: string;
};

type Beneficiary = {
  cpf: string,
  uuid: string
}

export type BecomeBeneficiaryResponseDto = {
  beneficiaries: Beneficiary[]
} & RapidocResponseDto