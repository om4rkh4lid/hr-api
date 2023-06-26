import { Injectable } from '@nestjs/common';
import { AttendanceEvent } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { convertToMinutes } from 'src/common/helpers/convert-to-minutes';
import { ExtendedEmployee } from 'src/employees/entitites/extended-employee.entity';

@Injectable()
export class LatenessPolicy {
  constructor(private readonly prisma: PrismaService) {}

  getLateTime(employee: ExtendedEmployee, date: Date) {
    const clockInHr = date.getHours();
    const clockInMinutes = date.getMinutes();

    let lateHrs;
    let lateMins;
    if (employee.attendancePolicy.flexibleHoursPolicy) {
      if (!employee.attendancePolicy.flexibleHoursPolicy.fullyFlexible) {
        lateHrs =
          clockInHr - employee.attendancePolicy.flexibleHoursPolicy.startHr;
        lateMins =
          clockInMinutes -
          employee.attendancePolicy.flexibleHoursPolicy.startMins;
      } else {
        lateHrs = 0;
        lateMins = 0;
      }
    } else {
      lateHrs = clockInHr - employee.attendancePolicy.startHr;
      lateMins = clockInHr - employee.attendancePolicy.startMins;
    }

    return { lateHrs, lateMins };
  }

  getVerdict(employee: ExtendedEmployee, date: Date): AttendanceEvent {
    const {
      allowedLateHrs,
      allowedLateMinutes,
      lateHrsToAbsent: lateLimitHrs,
      lateMinutesToAbsent: lateLimitMins,
    } = employee.attendancePolicy.companyPolicy;

    const { lateHrs, lateMins } = this.getLateTime(employee, date);

    const totalLateInMinutes = convertToMinutes(lateHrs, lateMins);
    const totalAllowedLateInMinutes = convertToMinutes(
      allowedLateHrs,
      allowedLateMinutes,
    );
    const totalLateLimitInMinutes = convertToMinutes(
      lateLimitHrs,
      lateLimitMins,
    );

    let lateVerdict: AttendanceEvent = AttendanceEvent.CLOCK_IN;
    if (totalLateInMinutes > totalLateLimitInMinutes) {
      lateVerdict = AttendanceEvent.ABSENT;
    } else if (totalLateInMinutes > totalAllowedLateInMinutes) {
      lateVerdict = AttendanceEvent.LATE_CLOCK_IN;
    }
    return lateVerdict;
  }
}
