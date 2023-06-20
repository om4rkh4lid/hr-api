import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  host: process.env.SERVER_HOST,
  port: parseInt(process.env.SERVER_PORT),
}));
