import type { OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(() => Logger.log('Connected to database', 'PrismaService'))
      .catch((error: Error) => {
        Logger.error(error, 'PrismaService');
        process.exit(1);
      });
  }
}
