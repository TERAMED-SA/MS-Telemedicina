import Joi from 'joi';

export const smsValidationSchema = Joi.object({
  from: Joi.string().pattern(/^\+?\d{1,15}$/).default('TERAMED - SISTEMAS DE SAÚDE, SA'),
  to: Joi.string().pattern(/^\+?\d{1,15}$/).required().messages({
    'string.base': 'O campo "to" deve ser um número de telefone válido.',
    'string.pattern.base': 'O campo "to" deve ser um número de telefone válido.',
    'any.required': 'O campo "to" é obrigatório.',
  }),
  body: Joi.string().min(1).max(160).required().messages({
    'string.base': 'O campo "message" deve ser uma string.',
    'string.min': 'O campo "message" deve ter pelo menos 1 caractere.',
    'string.max': 'O campo "message" deve ter no máximo 160 caracteres.',
    'any.required': 'O campo "message" é obrigatório.',
  }),
});
