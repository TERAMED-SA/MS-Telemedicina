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
  phone: string;
  isActive: boolean;
  client: Client;
};

type Specialty = {
  name: string;
  uuid: string;
};

type Professional = {
  name: string;
  specialties: Specialty[];
};

type Detail = {
  uuid: string;
  date: string;
  from: string;
  to: string;
};

export type ReadBeneficiaryAppointmentsResponseDto = {
  uuid: string;
  beneficiary: Beneficiary;
  specialty: Specialty;
  status: string;
  professional: Professional;
  detail: Detail;
  beneficiaryUrl: string;
};