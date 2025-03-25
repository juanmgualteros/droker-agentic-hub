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

  // Create the first admin user for the organization
  const adminUser = await prisma.user.create({
    data: {
      id: 'default-admin',
      email: "admin@example.com",
      name: "Admin User",
      role: "ADMIN",
      organizationId: organization.id,
      updatedAt: new Date(),
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