// Test specifically for the ApiKey table with policy
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testApiKeyTable() {
  console.log('=== TESTING API KEY TABLE WITH RLS POLICY ===\n');
  
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
      },
      global: {
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      }
    });
    
    // Try to query the ApiKey table with explicit schema (which we saw in your policy screenshot)
    console.log('\nAttempting to query public.ApiKey table...');
    const { data, error } = await supabase
      .from('ApiKey')
      .select('*')
      .limit(5);
    
    if (error) {
      console.log('❌ Query error:', error);
      console.log('\nYou may need to wait a bit longer for the RLS policies to take effect.');
      console.log('Supabase can sometimes take several minutes to propagate policy changes.');
    } else {
      console.log('✅ Query successful!');
      console.log(`Found ${data.length} ApiKey records`);
      if (data.length > 0) {
        console.log('First record:', data[0]);
      }
    }
    
  } catch (error) {
    console.error('❌ Supabase client error:', error.message);
  }
}

// Run the test
testApiKeyTable();
