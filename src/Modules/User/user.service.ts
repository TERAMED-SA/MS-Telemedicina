import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { UserServiceProvider } from "src/Infrastructure/Providers/User/user.service";

@Injectable()
export class UserService {
 
  constructor(private readonly provider: UserServiceProvider) {}
  
  async getUserDetails(userId: string) {
    const observable = await this.provider.readUserById(Number(userId))
    return await firstValueFrom(observable)
  }
}