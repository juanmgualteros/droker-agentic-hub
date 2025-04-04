// Test connection to a specific table with RLS policy
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSpecificTable() {
  console.log('=== TESTING SPECIFIC TABLE WITH RLS POLICY ===\n');
  
  // Get Supabase credentials from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Service Key (last 4): ****${supabaseServiceKey?.slice(-4) || 'undefined'}`);
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    return;
  }
  
  try {
    console.log('\nCreating Supabase client with service role key...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    // Try to query the ApiKeyToProduct table (the one shown in your screenshot)
    console.log('\nAttempting to query ApiKeyToProduct table...');
    const { data, error } = await supabase
      .from('ApiKeyToProduct')
      .select('*')
      .limit(5);
    
    if (error) {
      console.log('❌ Query error:', error);
    } else {
      console.log('✅ Query successful!');
      console.log(`Found ${data.length} rows`);
      if (data.length > 0) {
        console.log('First row:', data[0]);
      }
    }
    
  } catch (error) {
    console.error('❌ Supabase client error:', error.message);
  }
}

// Run the test
testSpecificTable();
