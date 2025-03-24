import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a temporary organization
  const organization = await prisma.organization.create({
    data: {
      id: 'temp-org-1',
      name: 'Temporary Organization',
      updatedAt: new Date(),
    },
  });

  // Create a temporary admin user
  const user = await prisma.user.create({
    data: {
      id: 'temp-user-1',
      email: 'tatiana@calderon.com',
      name: 'Tatiana Calderon',
      organizationId: organization.id,
      role: 'ADMIN',
      clerkId: 'temp-clerk-id',
      updatedAt: new Date(),
    },
  });

  // Create a subscription for the organization
  await prisma.subscription.create({
    data: {
      id: 'temp-sub-1',
      type: 'PRO',
      organizationId: organization.id,
      status: 'ACTIVE',
      updatedAt: new Date(),
    },
  });

  console.log('Created temporary admin user:', user);
  console.log('Created temporary organization:', organization);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 