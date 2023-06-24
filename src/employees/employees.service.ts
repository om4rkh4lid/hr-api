import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ExtendedEmployee } from './entitites/extended-employee.entity';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<ExtendedEmployee> {
    return new ExtendedEmployee(
      await this.prisma.employee.findUniqueOrThrow({
        where: { id },
        include: { directSubordinates: true, directSuperior: true },
      }),
    );
  }
}
