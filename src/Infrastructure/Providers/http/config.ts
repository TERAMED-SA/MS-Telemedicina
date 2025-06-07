import { Injectable } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClient {
  constructor(private readonly httpService: NestHttpService) {}

  get<T>(url: string): Observable<T> {
    return this.httpService.get<T>(url).pipe(map((response: AxiosResponse<T>) => response.data));
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.httpService.post<T>(url, data).pipe(map((response: AxiosResponse<T>) => response.data));
  }

  delete<T>(url: string): Observable<T> {
    return this.httpService.delete<T>(url).pipe(map((response: AxiosResponse<T>) => response.data));
  }

  put<T>(url: string, data?: any): Observable<T> {
    return this.httpService.put<T>(url, data).pipe(map((response: AxiosResponse<T>) => response.data));
  }
}