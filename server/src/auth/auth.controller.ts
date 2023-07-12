import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return req.user;
  }
}
