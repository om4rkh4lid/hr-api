import { AttendancePolicy } from 'src/attendance/entities/attendance-policy.entity';
import { Employee } from './employee.entity';
import { Company } from '@prisma/client';

export class ExtendedEmployee extends Employee {
  directSuperior?: Employee;
  directSubordindates: Employee[];
  attendancePolicy: AttendancePolicy;
  company: Company;
}
