import { ApiProperty } from "@nestjs/swagger";
import { RapidocResponseDto } from "./response.dto";

export class BecomeBeneficiaryRequestDto{
  @ApiProperty({example:'Carlos Antonio Marques'})
  name: string;

  @ApiProperty({example:'2000-01-01'})
  birthday: string;

  @ApiProperty({example:'925033626'})
  phone: string;

  @ApiProperty({example:'calosmarqu@gmail.com'})
  email: string;

  @ApiProperty({example:'Luanda. Talatona'})
  address: string;

  @ApiProperty({example:'Luanda'})
  city: string;
  
  @ApiProperty({example:'Angolano'})
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