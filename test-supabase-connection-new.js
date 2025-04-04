// Test Supabase database connection
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  // Get Supabase credentials from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Supabase Anon Key: ${supabaseAnonKey ? '****' + supabaseAnonKey.slice(-4) : 'undefined'}`);
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase credentials are missing in .env file');
    return;
  }
  
  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
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
    
  } catch (error) {
    console.error('❌ Supabase connection error:');
    console.error(error);
  }
}

// Run the test
testSupabaseConnection();
