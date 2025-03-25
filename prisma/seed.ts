import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Create default organization
  const organization = await prisma.organization.upsert({
    where: { id: 'default-org' },
    update: {},
    create: {
      id: 'default-org',
      name: 'Default Organization',
      updatedAt: new Date(),
    },
  });

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      id: 'default-admin',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
      organizationId: organization.id,
      updatedAt: new Date(),
      // Note: clerkId will be set when the admin signs up through Clerk
    },
  });

  // Create the superadmin user
  await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Super Admin',
      email: 'superadmin@example.com',
      role: 'SUPERADMIN',
      organizationId: organization.id,
      updatedAt: new Date(),
    },
  });

  console.log({ organization, adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 