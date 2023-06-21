import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(newUser: CreateUserDto) {
    newUser.password = await bcrypt.hash(
      newUser.password,
      this.config.get<number>('server.roundsOfHashing'),
    );
    return new User(await this.prisma.user.create({ data: newUser }));
  }

  async findAll() {
    const result = await this.prisma.user.findMany();
    return result.map((user) => new User(user));
  }

  async findOne(id: number) {
    return new User(
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      }),
    );
  }

  async findByEmail(email: string) {
    return new User(
      await this.prisma.user.findUniqueOrThrow({
        where: { email },
      }),
    );
  }
}
