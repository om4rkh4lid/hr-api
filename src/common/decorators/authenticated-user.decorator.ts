import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedEmployee } from 'src/employees/entitites/extended-employee.entity';
import { AuthenticatedEmployeeRequest } from '../interfaces/authenticated-employee-request.interface';

export const AuthenticatedEmployee = createParamDecorator(
  async (
    data: unknown,
    context: ExecutionContext,
  ): Promise<ExtendedEmployee> => {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedEmployeeRequest>();
    return request.employee;
  },
);
