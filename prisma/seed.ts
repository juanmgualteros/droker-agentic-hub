import { PrismaClient } from '@prisma/client';

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