import {
  MissedClockOutPolicy,
  CompanyAttendancePolicy as PrismaCompanyAttendancePolicy,
} from '@prisma/client';

export class CompanyAttendancePolicy implements PrismaCompanyAttendancePolicy {
  id: number;
  allowedLateMinutes: number;
  allowedLateHrs: number;
  breakDurationMinutes: number;
  onMissedClockOut: MissedClockOutPolicy;
  lateHrsToAbsent: number;
  lateMinutesToAbsent: number;
}
