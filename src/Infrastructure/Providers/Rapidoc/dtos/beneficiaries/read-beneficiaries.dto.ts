import { RapidocResponseDto } from "./response.dto"

export type ReadBeneficiaryDto = {
  birthday: string,
  cpf: string,
  name: string,
  uuid: string
}

export type ReadBeneficiariesResponseDto = {
  beneficiaries: ReadBeneficiaryDto[]
} & RapidocResponseDto;

export type ReadBeneficiaryByCPFResponseDto = {
  beneficiary: ReadBeneficiaryDto
} & RapidocResponseDto;