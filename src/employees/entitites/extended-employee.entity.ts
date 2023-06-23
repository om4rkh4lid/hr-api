import { Employee } from './employee.entity';

export class ExtendedEmployee extends Employee {
  directSuperior?: Employee;
  directSubordindates: Employee[];
}
