import { SigningKeyCallback, verify } from 'jsonwebtoken';
import { promisify } from 'util';

export const verifyTokenAsync = promisify(verify) as (
  token: string,
  secret: string,
) => Promise<SigningKeyCallback>;
