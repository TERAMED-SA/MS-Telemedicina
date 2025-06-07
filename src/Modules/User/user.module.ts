import { Module } from '@nestjs/common';
import { UserProviderModule } from 'src/Infrastructure/Providers/User/user.module';
import { UserService } from './user.service';

@Module({
  imports:      [
    UserProviderModule,
  ],
  providers:    [
    UserService
  ],
  exports: [UserService]
})

export class UserModule {}