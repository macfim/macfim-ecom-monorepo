import { PrismaClient } from '@prisma/client';

import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'boughattasjassem@outlook.com' },
    update: {},
    create: {
      email: 'boughattasjassem@outlook.com',
      firstName: 'Jassem',
      lastName: 'Boughattas',
      role: 'ADMIN',
      passwordHash: await argon2.hash('Jassem123'),
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
