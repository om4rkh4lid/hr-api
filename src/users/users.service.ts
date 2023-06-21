import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(newUser: CreateUserDto) {
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
}
