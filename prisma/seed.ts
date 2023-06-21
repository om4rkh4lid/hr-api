// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user_1 = await prisma.user.upsert({
    where: { email: 'omar@admin.com' },
    update: {},
    create: {
      email: 'omar@admin.com',
      password: '1234',
    },
  });

  console.log({ user_1 });
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