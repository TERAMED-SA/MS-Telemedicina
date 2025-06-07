type Specialty = {
  name: string;
  uuid: string;
};

type Client = {
  name: string;
  uuid: string;
};

type Beneficiary = {
  name: string;
  uuid: string;
  cpf: string;
  email: string;
  birth: string;
  phone?: string;
  isActive: boolean;
  client: Client;
};

type Professional = {
  name: string;
  specialties: Specialty[];
};

type BeneficiaryMedicalReferral = {
  uuid: string;
  beneficiary: Beneficiary;
  createdAt: string;
  updatedAt: string;
  status: string;
  urlPath: string;
};

type Detail = {
  uuid: string;
  date: string;
  from: string;
  to: string;
};

export type ReadBeneficiarySchedulingResponse = {
  uuid: string;
  beneficiary: Beneficiary;
  specialty: Specialty;
  status: string;
  professional: Professional;
  detail: Detail;
  beneficiaryUrl: string;
  beneficiaryMedicalReferral?: BeneficiaryMedicalReferral;
};