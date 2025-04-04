// Direct Supabase connection test using raw PostgreSQL client
require('dotenv').config();
const { Pool } = require('pg');

async function testDirectConnection() {
  console.log('=== DIRECT POSTGRESQL CONNECTION TEST ===\n');
  
  try {
    // Get database connection string from environment variables
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      console.error('❌ Missing DATABASE_URL in .env file');
      return;
    }
    
    console.log('Connecting to PostgreSQL directly...');
    console.log(`Connection string: ${connectionString.replace(/:[^:@]*@/, ':****@')}`);
    
    // Create a connection pool
    const pool = new Pool({ connectionString });
    
    // Test the connection
    console.log('\nTesting connection...');
    const client = await pool.connect();
    console.log('✅ Successfully connected to PostgreSQL!');
    
    // Query for available tables
    console.log('\nQuerying for tables in public schema...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length === 0) {
      console.log('No tables found in public schema');
    } else {
      console.log(`Found ${tablesResult.rows.length} tables in public schema:`);
      tablesResult.rows.forEach((row, i) => {
        console.log(`  ${i+1}. ${row.table_name}`);
      });
      
      // Try to query the first table
      if (tablesResult.rows.length > 0) {
        const firstTable = tablesResult.rows[0].table_name;
        console.log(`\nAttempting to query first table: ${firstTable}...`);
        
        try {
          const tableResult = await client.query(`
            SELECT * FROM public.${firstTable} LIMIT 5
          `);
          
          console.log(`✅ Successfully queried ${firstTable}!`);
          console.log(`Found ${tableResult.rows.length} rows`);
          
          if (tableResult.rows.length > 0) {
            console.log('First row:');
            console.log(tableResult.rows[0]);
          }
        } catch (tableError) {
          console.error(`❌ Error querying ${firstTable}:`, tableError.message);
        }
      }
    }
    
    // Release the client back to the pool
    client.release();
    
    // Close the pool
    await pool.end();
    console.log('\nConnection pool closed');
    
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

// Run the test
testDirectConnection();
