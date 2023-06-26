import { Employee as PrismaEmployee } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Employee implements PrismaEmployee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  directSuperiorId: number;
  photoUrl: string;

  @Exclude()
  userId: number;

  @Exclude()
  attendancePolicyId: number;

  @Exclude()
  companyId: number;

  constructor(partial: Partial<Employee>) {
    Object.assign(this, partial);
  }
}
