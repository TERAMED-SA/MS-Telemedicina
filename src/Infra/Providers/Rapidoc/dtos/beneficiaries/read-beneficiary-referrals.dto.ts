type BeneficiaryClient = {
  name: string;
  uuid: string;
};

type Beneficiary = {
  name: string;
  uuid: string;
  cpf: string;
  email: string;
  birth: string;
  phone: string;
  isActive: boolean;
  client: BeneficiaryClient;
};

export type ReadBeneficiaryReferralsResponseDto = {
  uuid: string;
  beneficiary: Beneficiary;
  createdAt: string;
  updatedAt: string;
  status: string;
  urlPath: string;
};