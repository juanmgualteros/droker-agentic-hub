// Test Supabase connection with service role key
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseAdminConnection() {
  console.log('Testing Supabase connection with service role key...');
  
  // Get Supabase credentials from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Supabase Service Key: ${supabaseServiceKey ? '****' + supabaseServiceKey.slice(-4) : 'undefined'}`);
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Supabase credentials are missing in .env file');
    return;
  }
  
  try {
    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Test connection by querying for organizations
    console.log('Attempting to query organization table...');
    const { data: orgs, error } = await supabase
      .from('organization')
      .select('*')
      .limit(5);
    
    if (error) {
      throw error;
    }
    
    console.log(`✅ Successfully connected to Supabase!`);
    console.log(`Found ${orgs.length} organizations`);
    
    if (orgs.length > 0) {
      console.log('Sample organization:');
      console.log(JSON.stringify(orgs[0], null, 2));
    }
    
    // Try alternative table name if needed
    console.log('\nTrying alternative table name (organizations)...');
    const { data: orgsAlt, error: errorAlt } = await supabase
      .from('organizations')
      .select('*')
      .limit(5);
    
    if (errorAlt) {
      console.log(`❌ Error querying 'organizations' table: ${errorAlt.message}`);
    } else {
      console.log(`✅ Successfully queried 'organizations' table!`);
      console.log(`Found ${orgsAlt.length} organizations`);
    }
    
    // Check for users table
    console.log('\nTrying to query "users" table...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5);
    
    if (usersError) {
      console.log(`❌ Error querying 'users' table: ${usersError.message}`);
    } else {
      console.log(`✅ Successfully queried 'users' table!`);
      console.log(`Found ${users.length} users`);
    }
    
  } catch (error) {
    console.error('❌ Supabase connection error:');
    console.error(error);
  }
}

// Run the test
testSupabaseAdminConnection();
