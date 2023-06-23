// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

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

  console.log({ user_1, user_2 });
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
