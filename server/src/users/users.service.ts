import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findOneByEmail(email: User['email']) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(userId: User['id']) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  create(data: Prisma.UserCreateArgs['data']) {
    return this.prisma.user.create({ data });
  }

  updateRefreshToken(userId: User['id'], refreshToken: User['refreshToken']) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
