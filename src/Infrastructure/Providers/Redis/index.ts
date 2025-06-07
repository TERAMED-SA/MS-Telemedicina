import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { enviroment } from 'src/enviroment';
import { Module } from '@nestjs/common';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: enviroment.REDIS_HOST,
      port: Number(enviroment.REDIS_PORT),
      password: enviroment.REDIS_PASSWORD || undefined,
    });
  },
};


@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})

export class RedisProviderModule {}