// test-supabase-connection.js
const { createClient } = require('@supabase/supabase-js');

// Use the provided Supabase credentials
const supabaseUrl = 'https://qvasgxzdjmldhbinbrgw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2YXNneHpkam1sZGhiaW5icmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MTY4ODMsImV4cCI6MjA1ODE5Mjg4M30.tGopV5w27s4V_Vz3H9KfDR9hR_z-sYO--U_7PHMqr9E';

async function testSupabaseConnection() {
  console.log('Connecting to Supabase...');
  console.log(`URL: ${supabaseUrl}`);
  console.log(`Key: ${supabaseKey.substring(0, 10)}...`);
  
  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // First, check what tables are available
    console.log('\nChecking available tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
      
    if (tablesError) {
      console.error('Error checking tables:', tablesError);
    } else {
      console.log('Available tables:', tables?.map(t => t.table_name).join(', '));
    }
    
    // Try 'organizations' (plural) first
    console.log('\nTrying to query "organizations" table (plural)...');
    const { data: orgsPlural, error: errorPlural } = await supabase
      .from('organizations')
      .select('*')
      .limit(5);
    
    if (errorPlural) {
      console.error('Query error (plural):', errorPlural);
    } else {
      console.log('Connection successful to "organizations"!');
      console.log('Data (first 5 records):', orgsPlural);
    }
    
    // Try 'organization' (singular) next
    console.log('\nTrying to query "organization" table (singular)...');
    const { data: orgsSingular, error: errorSingular } = await supabase
      .from('organization')
      .select('*')
      .limit(5);
    
    if (errorSingular) {
      console.error('Query error (singular):', errorSingular);
    } else {
      console.log('Connection successful to "organization"!');
      console.log('Data (first 5 records):', orgsSingular);
    }
    
    // Check for users table
    console.log('\nTrying to query "users" table...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5);
    
    if (usersError) {
      console.error('Query error (users):', usersError);
    } else {
      console.log('Connection successful to "users"!');
      console.log('Data (first 5 records):', users);
    }
  } catch (err) {
    console.error('Connection error:', err.message);
  }
}

// Run the test
testSupabaseConnection();
