import { Employee as PrismaEmployee, Weekday } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Employee implements PrismaEmployee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  directSuperiorId: number;
  daysOff: Weekday[];

  @Exclude()
  userId: number;

  constructor(partial: Partial<Employee>) {
    Object.assign(this, partial);
  }
}
