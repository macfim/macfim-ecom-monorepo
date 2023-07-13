import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@server/users/dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import type { JwtPayload } from './types';
import { Request as ExpressRequest } from 'express';

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
  async logout(@Req() req: ExpressRequest) {
    const user = req.user as JwtPayload;

    await this.authService.logout(user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: ExpressRequest) {
    const user = req.user as JwtPayload & { refreshToken: string };

    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
