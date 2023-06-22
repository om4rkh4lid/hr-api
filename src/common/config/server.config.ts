import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  host: process.env.SERVER_HOST,
  port: parseInt(process.env.SERVER_PORT),
  roundsOfHashing: parseInt(process.env.HASHING_ROUNDS),
}));
