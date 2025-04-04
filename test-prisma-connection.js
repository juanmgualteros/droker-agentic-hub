// Test Prisma database connection
const { PrismaClient } = require('@prisma/client');

async function testPrismaConnection() {
  console.log('Testing Prisma database connection...');
  
  try {
    // Create a new Prisma client
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    
    // Test connection by querying for organizations
    console.log('Attempting to query organizations table...');
    const organizations = await prisma.organization.findMany({
      take: 5, // Limit to 5 results
    });
    
    console.log(`✅ Successfully connected to database via Prisma!`);
    console.log(`Found ${organizations.length} organizations`);
    
    if (organizations.length > 0) {
      console.log('Sample organization:');
      console.log(JSON.stringify(organizations[0], null, 2));
    }
    
    // Close the connection
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Prisma connection error:');
    console.error(error);
  }
}

// Run the test
testPrismaConnection();
