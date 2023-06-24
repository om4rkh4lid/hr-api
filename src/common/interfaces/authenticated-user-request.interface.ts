import { User } from 'src/users/entities/user.entity';
import { AuthenticatedRequest } from './authenticated-request.interface';

export interface AuthenticatedUserRequest extends AuthenticatedRequest {
  user: User;
}
