import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.findOne(id);
  }
}
