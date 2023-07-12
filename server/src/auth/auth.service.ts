import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await argon2.verify(user.passwordHash, password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;

      return result;
    }

    return null;
  }
}
