import { Request } from 'express';
import { AuthTokenPayload } from './auth-token-payload.interface';

export interface AuthenticatedRequest extends Request {
  decodedToken: AuthTokenPayload;
}
