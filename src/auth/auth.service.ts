import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(credentials: LoginCredentialsDto): Promise<User> {
    const user = await this.usersService.findByEmail(credentials.email);
    const passwordsMatch = await bcrypt.compare(
      user.password,
      credentials.password,
    );
    if (!passwordsMatch) throw new UnauthorizedException();
    return new User(user);
  }
}
