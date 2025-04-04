// test-db-connection.js
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    
    // Try a simple query to test the connection
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    
    console.log('Connection successful!', result);
    
    // Try to fetch organizations to test that specific query
    console.log('Testing organization query...');
    const orgs = await prisma.organization.findMany({
      take: 1, // Just get one record to verify
    });
    
    console.log(`Found ${orgs.length} organizations`);
    if (orgs.length > 0) {
      console.log('Sample organization:', {
        id: orgs[0].id,
        name: orgs[0].name,
      });
    }
    
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
