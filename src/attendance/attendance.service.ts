import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExtendedEmployee } from 'src/employees/entitites/extended-employee.entity';
import { LatenessPolicy } from './policies/lateness.policy';
import { getDateTime } from 'src/common/helpers/get-date-time';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly latenessPolicy: LatenessPolicy,
  ) {}

  async clockIn(employee: ExtendedEmployee) {
    const now = Date.now();
    const date = new Date(now);
    const dateTime = getDateTime(date);

    const attendanceEvent = this.latenessPolicy.getVerdict(employee, date);

    return await this.prisma.attendanceLog.create({
      data: {
        employee: { connect: { id: employee.id } },
        ...dateTime,
        eventType: attendanceEvent,
      },
    });
  }

  async clockOut(employee: ExtendedEmployee) {
    return 'Clock Out';
  }
}
