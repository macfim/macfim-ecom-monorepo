import type { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
  email!: string;
  firstName!: string;
  lastName!: string;
  @Exclude()
  passwordHash!: string;
  @Exclude()
  refreshToken!: string | null;
  role!: Role;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
