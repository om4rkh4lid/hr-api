import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthPayload } from './entity/auth-payload.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthTokenPayload } from 'src/common/interfaces/auth-token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async login(credentials: LoginCredentialsDto): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(credentials.email);

    const passwordsMatch = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!passwordsMatch) throw new UnauthorizedException();

    const tokenPayload: AuthTokenPayload = { userId: user.id };
    if (user.employee) {
      tokenPayload.employeeId = user.employee.id;
    }
    console.log(tokenPayload);
    const token = jwt.sign(
      tokenPayload,
      this.config.get<string>('jwt.secret'),
      { expiresIn: this.config.get<string>('jwt.expiresIn') },
    );
    return new AuthPayload(token);
  }
}
