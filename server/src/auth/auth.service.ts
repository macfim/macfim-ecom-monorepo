import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Role, User } from '@prisma/client';
import type { CreateUserDto } from '@server/users/dto';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';

import type { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await argon2.verify(user.passwordHash, password))) {
      return user;
    }

    return null;
  }

  async login({ email, password }: AuthDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await argon2.verify(user.passwordHash, password);

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, user.email, user.role);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  logout(userId: string) {
    return this.usersService.updateRefreshToken(userId, null);
  }

  async register({ email, password, ...rest }: CreateUserDto) {
    const userExists = await this.usersService.findOneByEmail(email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await this.hashData(password);

    const newUser = await this.usersService.create({
      email,
      passwordHash: hash,
      ...rest,
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private hashData(data: string) {
    return argon2.hash(data);
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }

  private async getTokens(userId: string, email: string, role: Role) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
