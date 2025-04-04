require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Check if the required environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Environment check:');
console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? 'Present' : 'MISSING'}`);
console.log(`- SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? 'Present' : 'MISSING'}`);

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function listTables() {
  console.log('\n--- Listing Database Tables ---');
  
  try {
    // Query for table names in the database
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_schema, table_name')
      .eq('table_schema', 'public');
    
    if (error) {
      console.error('Error fetching table list:', error);
      
      // Try an alternative method
      console.log('\nTrying alternative method to list tables...');
      const { data: altData, error: altError } = await supabase.rpc('pg_catalog.pg_tables');
      
      if (altError) {
        console.error('Alternative method also failed:', altError);
      } else {
        console.log('Tables found:', altData?.length || 0);
        console.log(altData);
      }
      
      return;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} tables`);
    console.log('Tables:');
    (data || []).forEach((table, i) => {
      console.log(`  ${i+1}. ${table.table_schema}.${table.table_name}`);
    });
    
    // Check specifically for organization-related tables
    const orgTables = (data || []).filter(t => 
      t.table_name.toLowerCase().includes('org') || 
      t.table_name.toLowerCase().includes('organization')
    );
    
    if (orgTables.length > 0) {
      console.log('\nOrganization-related tables:');
      orgTables.forEach((table, i) => {
        console.log(`  ${i+1}. ${table.table_schema}.${table.table_name}`);
      });
    } else {
      console.log('\nNo organization-related tables found');
    }
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Main execution
async function main() {
  console.log('Listing tables in Supabase database...');
  
  await listTables();
  
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
