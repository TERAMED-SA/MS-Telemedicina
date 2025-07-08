import { z } from 'zod';

export const smsValidationSchema = z.object({
  from: z
    .string()
    .regex(/^\+?\d{1,15}$/, {
      message: 'O campo "from" deve ser um número de telefone válido.',
    })
    .optional(),    
  to: z
    .string({
      required_error: 'O campo "to" é obrigatório.',
      invalid_type_error: 'O campo "to" deve ser um número de telefone válido.',
    })
    .regex(/^\+?\d{1,15}$/, {
      message: 'O campo "to" deve ser um número de telefone válido.',
    }),

  body: z
    .string({
      required_error: 'O campo "message" é obrigatório.',
      invalid_type_error: 'O campo "message" deve ser uma string.',
    })
    .min(1, { message: 'O campo "message" deve ter pelo menos 1 caractere.' })
    .max(160, {
      message: 'O campo "message" deve ter no máximo 160 caracteres.',
    }),
});
