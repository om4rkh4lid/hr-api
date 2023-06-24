import { Controller, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthenticatedEmployee } from 'src/common/decorators/authenticated-user.decorator';
import { ExtendedEmployee } from 'src/employees/entitites/extended-employee.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('attendance')
@ApiTags('Attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('clock-in')
  async clockIn(@AuthenticatedEmployee() employee: ExtendedEmployee) {
    return await this.attendanceService.clockIn(employee);
  }

  @Post('clock-out')
  async clockOut(@AuthenticatedEmployee() employee: ExtendedEmployee) {
    return await this.attendanceService.clockOut(employee);
  }
}
