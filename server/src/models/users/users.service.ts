import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { PrismaService } from '@server/models/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findOneByEmail(email: User['email']) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  findOneById(userId: User['id']) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  create(data: Prisma.UserCreateArgs['data']) {
    return this.prisma.user.create({ data });
  }
}
