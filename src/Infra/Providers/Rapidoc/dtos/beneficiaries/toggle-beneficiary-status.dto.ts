import { RapidocResponseDto } from "./response.dto";

export type ToggleBeneficiaryStatusResponseDto = {
  beneficiary: {
    uuid: string
  }
} & RapidocResponseDto;