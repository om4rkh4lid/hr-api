import { User as PrismaUser } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements PrismaUser {
  id: number;
  email: string;
  createdAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
