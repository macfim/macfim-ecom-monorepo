import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTweet(params: { data: Prisma.UserCreateInput }) {
    const { data } = params;

    return this.prisma.user.create({ data });
  }

  async getUniqueUser(params: { where: Prisma.UserWhereUniqueInput }) {
    const { where } = params;

    return this.prisma.user.findUnique({ where });
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;

    return this.prisma.user.update({ data, where });
  }

  async deleteUser(params: { where: Prisma.UserWhereUniqueInput }) {
    const { where } = params;

    return this.prisma.user.delete({ where });
  }
}
