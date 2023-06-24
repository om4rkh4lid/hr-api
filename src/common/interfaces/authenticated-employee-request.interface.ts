import { ExtendedEmployee } from 'src/employees/entitites/extended-employee.entity';
import { AuthenticatedRequest } from './authenticated-request.interface';

export interface AuthenticatedEmployeeRequest extends AuthenticatedRequest {
  employee: ExtendedEmployee;
}
