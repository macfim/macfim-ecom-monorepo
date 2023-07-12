import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.getUniqueUser({ where: { email } });

    return user;
  }
}
