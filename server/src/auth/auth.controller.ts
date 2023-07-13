import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@server/users/dto';
import { AuthDto } from './dto';
import { JwtPayload } from './types';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: ExpressRequest) {
    const user = req.user as JwtPayload;

    console.log(user);

    this.authService.logout(user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: ExpressRequest) {
    const user = req.user as JwtPayload & { refreshToken: string };

    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
