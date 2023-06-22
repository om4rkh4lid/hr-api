import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginExceptionFilter } from 'src/common/exceptions/login-exception.filter';
import { AuthPayload } from './entity/auth-payload.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseFilters(LoginExceptionFilter)
  async login(@Body() credentials: LoginCredentialsDto): Promise<AuthPayload> {
    return await this.authService.login(credentials);
  }
}
