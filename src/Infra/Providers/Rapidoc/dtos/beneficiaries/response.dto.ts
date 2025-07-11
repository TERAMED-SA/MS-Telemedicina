import { ApiProperty } from "@nestjs/swagger";

export class RapidocResponseDto{
  @ApiProperty({ example:'Beneficiario adicionado com sucesso' })
  message: string;

  @ApiProperty({example:true})
  success: boolean;
}