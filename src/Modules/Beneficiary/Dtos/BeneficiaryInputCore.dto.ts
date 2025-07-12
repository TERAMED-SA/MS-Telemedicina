import { ApiProperty } from "@nestjs/swagger";
import { BecomeBeneficiaryRequestDto } from "src/Infra/Providers/Rapidoc/dtos/beneficiaries";

class BeneficiaryInputCoreDto extends BecomeBeneficiaryRequestDto{
    @ApiProperty({example:"004323548LA056"})
    bi:string;

    @ApiProperty({example:"e9549960-3238-4a9a-b5da-9e1847bd4ebc"})
    id:string;
}

export default BeneficiaryInputCoreDto;