export type ScheduleAppointmentRequestDto = {
  beneficiaryUuid: string,
  availabilityUuid: string
  specialtyUuid: string
  approveAdditionalPayment: boolean
}

export type ScheduleAppointmentResponseDto = {
  uuid: string;
  beneficiary: {
    name: string;
    uuid: string;
    cpf: string;
    email: string;
    birth: string;
    phone: string;
    isActive: boolean;
    client: {
      name: string;
      uuid: string;
    };
  };
  specialty: {
    name: string;
    uuid: string;
  };
  status: string;
  detail: {
    uuid: string;
    date: string;
    from: string;
    to: string;
  };
  beneficiaryUrl: string;
};