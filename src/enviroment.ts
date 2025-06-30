import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  SERVER_PORT: z.string().transform(Number).default('3000'),

  DATABASE_URL: z.string().url(),
  RABBITMQ_URI: z.string().url(),

  RAPIDOC_BASE_URL: z.string(),
  RAPIDOC_CLIENT_ID: z.string(),
  RAPIDOC_AUTHORIZATION: z.string(),
  RAPIDOC_CONTENT_TYPE: z.string().default('application/json'),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().transform(Number).default('6379'),
  REDIS_PASSWORD: z.string().default(''),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Variáveis de ambiente inválidas:', _env.error.format());
  process.exit(1);
}

export const enviroment = _env.data;