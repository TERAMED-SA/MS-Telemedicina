import { Injectable } from "@nestjs/common";
import { HttpClient } from "../http/config";
import { Observable } from "rxjs";
import { ReadUserResponseDto } from "./dtos";

@Injectable()
export class UserServiceProvider {
  constructor(
    private readonly httpClient: HttpClient
  ) {}

  async readUserById(id: number):
  Promise<
    Observable<ReadUserResponseDto | null>
  > {
    return this.httpClient.get<ReadUserResponseDto>(`/users/${id}`);
  }
}