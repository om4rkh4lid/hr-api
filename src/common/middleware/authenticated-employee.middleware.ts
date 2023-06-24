import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { EmployeesService } from 'src/employees/employees.service';
import { AuthenticatedEmployeeRequest } from '../interfaces/authenticated-employee-request.interface';

@Injectable()
export class AuthenticatedEmployeeMiddleware implements NestMiddleware {
  constructor(private readonly employeesSevice: EmployeesService) {}

  async use(
    req: AuthenticatedEmployeeRequest,
    res: Response,
    next: NextFunction,
  ) {
    if (req.decodedToken?.employeeId) {
      const employee = await this.employeesSevice.findOne(
        req.decodedToken.employeeId,
      );
      req.employee = employee;
      next();
    } else {
      next(new UnauthorizedException('This is an employee only route'));
    }
  }
}
