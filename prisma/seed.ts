// prisma/seed.ts

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user_1 = await prisma.user.upsert({
    where: { email: 'omar@admin.com' },
    update: {},
    create: {
      email: 'omar@admin.com',
      password: await bcrypt.hash('omar', 10),
    },
  });

  const user_2 = await prisma.user.upsert({
    where: { email: 'omar@employee.com' },
    update: {},
    create: {
      email: 'omar@employee.com',
      password: await bcrypt.hash('omar', 10),
    },
  });

  const user_2_actual = await prisma.user.findUnique({
    where: { email: 'omar@employee.com' },
  });

  const employee_1 = await prisma.employee.create({
    data: {
      firstName: 'Omar',
      lastName: 'Khalid',
      userId: user_2_actual.id,
    },
  });

  const employee_1_actual = await prisma.employee.findUnique({
    where: { userId: user_2_actual.id },
  });

  const attendance_policy_1 = await prisma.attendancePolicy.create({
    data: { employeeId: employee_1_actual.id },
  });

  console.log(
    'Employee after update:',
    await prisma.employee.findUnique({
      where: { userId: user_2_actual.id },
      include: { attendancePolicy: true },
    }),
  );

  console.log({
    user_1,
    user_2_actual,
    employee_1_actual,
    attendance_policy_1,
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
