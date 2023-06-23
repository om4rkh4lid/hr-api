import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/employees/entitites/employee.entity';

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

  async findOne(criteria: Partial<User>): Promise<User> {
    const result = await this.prisma.user.findUniqueOrThrow({
      where: criteria,
      include: {
        employee: true,
      },
    });
    if (result.employee) {
      result.employee = new Employee(result.employee);
    }
    return new User(result);
  }

  async findById(id: number): Promise<User> {
    return await this.findOne({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }
}
