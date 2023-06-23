import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Employee } from './entitites/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<Employee> {
    return new Employee(
      await this.prisma.employee.findUniqueOrThrow({ where: { id } }),
    );
  }
}
