import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExtendedEmployee } from './entitites/extended-employee.entity';
import { FlexibleHoursPolicy } from 'src/attendance/entities/flexible-hours-policy.entity';
import { AttendancePolicy } from 'src/attendance/entities/attendance-policy.entity';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<ExtendedEmployee> {
    const result = await this.prisma.employee.findUniqueOrThrow({
      where: { id },
      include: {
        directSubordinates: true,
        directSuperior: true,
        attendancePolicy: {
          include: {
            flexibleHoursPolicy: true,
            companyPolicy: true,
          },
        },
        company: true,
      },
    });

    if (result.attendancePolicy) {
      if (result.attendancePolicy.flexibleHoursPolicy) {
        result.attendancePolicy.flexibleHoursPolicy = new FlexibleHoursPolicy(
          result.attendancePolicy.flexibleHoursPolicy,
        );
      }
      result.attendancePolicy = new AttendancePolicy(result.attendancePolicy);
    }

    return new ExtendedEmployee(result);
  }
}
