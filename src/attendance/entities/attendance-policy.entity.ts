import {
  MissedClockOutPolicy,
  AttendancePolicy as PrismaAttendancePolicy,
  Weekday,
} from '@prisma/client';
import { Exclude } from 'class-transformer';
import { FlexibleHoursPolicy } from './flexible-hours-policy.entity';
import { CompanyAttendancePolicy } from './company-attendance-policy';

export class AttendancePolicy implements PrismaAttendancePolicy {
  id: number;
  startHr: number;
  startMins: number;
  workingHrs: number;
  daysOff: Weekday[];
  employeeId: number;
  companyPolicy: CompanyAttendancePolicy;
  flexibleHoursPolicy: FlexibleHoursPolicy;

  @Exclude()
  flexibleHoursPolicyId: number;

  @Exclude()
  companyAttendancePolicyId: number;

  constructor(partial: Partial<AttendancePolicy>) {
    Object.assign(this, partial);
  }
}
