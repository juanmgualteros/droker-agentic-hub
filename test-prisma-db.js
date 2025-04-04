// Test database connection using Prisma
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testPrismaConnection() {
  console.log('=== TESTING DATABASE CONNECTION USING PRISMA ===\n');
  
  try {
    console.log('Creating Prisma client...');
    const prisma = new PrismaClient();
    
    // Test connection by querying for organizations
    console.log('\nAttempting to query organizations table...');
    try {
      const organizations = await prisma.organization.findMany({
        take: 5,
      });
      
      console.log('✅ Query successful!');
      console.log(`Found ${organizations.length} organizations`);
      if (organizations.length > 0) {
        console.log('First organization:', organizations[0]);
      }
    } catch (queryError) {
      console.error('❌ Organization query error:', queryError.message);
      
      // Try a different table
      console.log('\nTrying to query a different table...');
      try {
        const products = await prisma.product.findMany({
          take: 5,
        });
        
        console.log('✅ Products query successful!');
        console.log(`Found ${products.length} products`);
        if (products.length > 0) {
          console.log('First product:', products[0]);
        }
      } catch (productsError) {
        console.error('❌ Products query error:', productsError.message);
      }
    }
    
    // Close the Prisma client
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Prisma client error:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

// Run the test
testPrismaConnection();
