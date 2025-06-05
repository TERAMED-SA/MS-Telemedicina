import { Injectable } from '@nestjs/common';
import IService from 'src/Core/interfaces/IService';
import { OutRecipientDto } from 'src/Core/shared/dtos/Recipient.dto';
import ResponseDto from 'src/Core/shared/dtos/Response.dto';
import RecipientRepository from '../Recipient.repository';
import RecipientMapper from 'src/Core/shared/dataMappers/Recipient.mapper';

@Injectable()
export class GetAllService implements IService<OutRecipientDto> {
  constructor(private readonly repository: RecipientRepository) {}

  public async main(): Promise<ResponseDto<OutRecipientDto[]>> {
    const recipients = await this.repository.getAll();

    const output = recipients.map((recipient) =>
      RecipientMapper.toOutDtoRecipientMapper(recipient)
    );

    return {
      error: false,
      status: 200,
      description: 'OK',
      message: 'Usuarios Listados com Sucesso',
      data: output,
    };
  }
}
