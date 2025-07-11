import { ApiProperty } from "@nestjs/swagger";
import { RapidocResponseDto } from "./response.dto";

export class BecomeBeneficiaryRequestDto{
  @ApiProperty({example:'Carlos Antonio Marques'})
  name: string;

  @ApiProperty({example:'Carlos Antonio Marques'})
  birthday: string;

  @ApiProperty({example:'Carlos Antonio Marques'})
  phone: string;

  @ApiProperty({example:'Carlos Antonio Marques'})
  email: string;

  @ApiProperty({example:'Carlos Antonio Marques'})
  address: string;

  @ApiProperty({example:'Carlos Antonio Marques'})
  city: string;
  
  @ApiProperty({example:'Carlos Antonio Marques'})
  state: string;
};

export class RequiredFields {
  cpf: string;
  zipCode: string;
}

class Beneficiary{
  cpf: string;
  uuid: string;
}

export class BecomeBeneficiaryResponseDto extends RapidocResponseDto {
  beneficiaries: Beneficiary[];
}