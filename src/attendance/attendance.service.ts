import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExtendedEmployee } from 'src/employees/entitites/extended-employee.entity';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async clockIn(employee: ExtendedEmployee) {
    const now = Date.now();
    const date = new Date(now);
    return await this.prisma.attendanceLog.create({
      data: {
        start: date.toISOString(),
        employeeId: employee.id,
      },
    });
  }

  async clockOut(employee: ExtendedEmployee) {
    const now = Date.now();
    const date = new Date(now);
    const logs = await this.prisma.attendanceLog.findMany({
      where: {
        employeeId: employee.id,
        end: null,
      },
      orderBy: {
        start: 'desc',
      },
    });

    if (logs.length == 0) {
      throw new BadRequestException('You have not clocked in today');
    } else {
      const idList = logs.map((log) => log.id);
      const updated = await this.prisma.attendanceLog.updateMany({
        where: {
          id: {
            in: idList,
          },
        },
        data: {
          end: date.toISOString(),
        },
      });
      return updated;
    }
  }
}
