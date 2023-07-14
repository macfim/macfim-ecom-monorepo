import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '@server/users/dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import type { JwtPayload } from './types';
import { RefreshTokenGuard } from '@server/shared/guards';
import { GetCurrentUser, Public } from '@server/shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/register')
  registerLocal(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerLocal(createUserDto);
  }

  @Public()
  @Post('local/login')
  loginLocal(@Body() data: AuthDto) {
    return this.authService.loginLocal(data);
  }

  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@GetCurrentUser('sub') userId: string) {
    await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@GetCurrentUser() user: JwtPayload & { refreshToken: string }) {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
