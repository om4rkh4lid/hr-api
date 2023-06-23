import { User as PrismaUser } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Employee } from 'src/employees/entitites/employee.entity';

export class User implements PrismaUser {
  id: number;
  email: string;
  createdAt: Date;
  employee?: Employee;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
