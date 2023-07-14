import { PrismaClient } from '@prisma/client';

import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'test@test.test' },
    update: {},
    create: {
      email: 'test@test.test',
      firstName: 'test',
      lastName: 'test',
      role: 'ADMIN',
      passwordHash: await argon2.hash('test'),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
