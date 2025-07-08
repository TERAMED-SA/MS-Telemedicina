import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { SendSmsDto } from './dto/send-sms.dto';
import { smsValidationSchema } from './validators/sms-validation.schema';
import { enviroment } from 'src/enviroment';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private baseUrl = enviroment.SMS_URL;

  async sendSms(data: SendSmsDto) {
   const result = smsValidationSchema.safeParse(data);

    if (!result.success) {
      const errorMsg = result.error.issues.map(i => i.message).join(', ');
      throw new BadRequestException(errorMsg);
    }

    const validatedData = result.data;

    try {
      await axios.post(
        `${this.baseUrl}/sms`,
        [validatedData],
      );
      
      this.logger.log(`🔔 SMS enviado para ${validatedData.to}: ${validatedData.body}`);
    } catch (error) {
      this.logger.error(`❌ Erro ao enviar SMS: ${error.message}`);
      return new BadRequestException('Erro ao enviar SMS');
    }
  }

  async sendEmail(to: string, subject: string, body: string) {
    this.logger.log(`📧 Email enviado para ${to} - Assunto: ${subject}`);
  }
}
