import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root')
export class AppController {
  @Get('health')
  health(): string {
    return 'OK';
  }
}
