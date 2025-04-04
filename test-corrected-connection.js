// Test with corrected database connection string
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

async function testCorrectedConnection() {
  console.log('=== TESTING WITH CORRECTED CONNECTION STRING ===\n');
  
  // Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // Corrected database connection string (using the correct hostname)
  const correctedDbUrl = 'postgresql://postgres:zygxeD-kitfin-mogpo4@db.qvasgxzdjmldhbinbrgw.supabase.co:5432/postgres';
  
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Service Key (last 4): ****${supabaseServiceKey?.slice(-4) || 'undefined'}`);
  console.log(`Using corrected DB URL with host: db.qvasgxzdjmldhbinbrgw.supabase.co`);
  
  // Part 1: Test direct PostgreSQL connection
  try {
    console.log('\n--- Testing Direct PostgreSQL Connection ---');
    console.log('Connecting to PostgreSQL directly...');
    
    const pool = new Pool({ connectionString: correctedDbUrl });
    
    console.log('Testing connection...');
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
    await pool.end();
    
  } catch (pgError) {
    console.error('❌ PostgreSQL connection error:', pgError.message);
  }
  
  // Part 2: Test Supabase client with corrected URL
  try {
    console.log('\n--- Testing Supabase Client ---');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase credentials in .env file');
      return;
    }
    
    console.log('Creating Supabase client with service role key...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    // Try to query the organization table
    console.log('\nAttempting to query organization table...');
    const { data, error } = await supabase
      .from('organization')
      .select('*')
      .limit(5);
    
    if (error) {
      console.log('❌ Query error:', error);
    } else {
      console.log('✅ Query successful!');
      console.log(`Found ${data.length} organizations`);
      if (data.length > 0) {
        console.log('First organization:', data[0]);
      }
    }
    
  } catch (supabaseError) {
    console.error('❌ Supabase client error:', supabaseError.message);
  }
}

// Run the test
testCorrectedConnection();
