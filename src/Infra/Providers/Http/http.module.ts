import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { HttpClient } from './http.service';

@Module({
  imports: [AxiosModule],
  providers: [HttpClient],
  exports: [HttpClient],
})

export class HttpProviderModule {}