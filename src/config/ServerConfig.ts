import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServerConfig {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get('server.host');
  }

  get port(): number {
    return this.configService.get('server.port');
  }
}
