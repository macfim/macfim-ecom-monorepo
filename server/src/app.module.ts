import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrpcModule } from './trpc/trpc.module';
import { UsersModule } from './users/users.module';

const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    TrpcModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
