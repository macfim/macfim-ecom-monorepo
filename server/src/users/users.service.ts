import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: User['email']) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(userId: User['id']) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  async create(data: Prisma.UserCreateArgs['data']) {
    return this.prisma.user.create({ data });
  }

  async updateRefreshToken(
    userId: User['id'],
    refreshToken: User['refreshToken'],
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
