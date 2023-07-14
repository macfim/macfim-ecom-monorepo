import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { JwtPayload } from '../../auth/types';
import type { Request as ExpressRequest } from 'express';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    const user = request.user as JwtPayload;

    return data ? user[data] : user;
  },
);
