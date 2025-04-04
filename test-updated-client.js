// Test with updated Supabase client configuration
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testUpdatedClient() {
  console.log('=== TESTING WITH UPDATED SUPABASE CLIENT ===\n');
  
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
    console.log('\nCreating Supabase client with improved configuration...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'X-Client-Info': 'supabase-js/2.x',
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      }
    });
    
    // Try to query the ApiKeyToProduct table (the one shown in your screenshot)
    console.log('\nAttempting to query ApiKeyToProduct table...');
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from('ApiKeyToProduct')
      .select('*')
      .limit(5);
    
    if (apiKeyError) {
      console.log('❌ ApiKeyToProduct query error:', apiKeyError);
    } else {
      console.log('✅ ApiKeyToProduct query successful!');
      console.log(`Found ${apiKeyData.length} rows`);
      if (apiKeyData.length > 0) {
        console.log('First row:', apiKeyData[0]);
      }
    }
    
    // Try to query the organization table
    console.log('\nAttempting to query organization table...');
    const { data: orgData, error: orgError } = await supabase
      .from('organization')
      .select('*')
      .limit(5);
    
    if (orgError) {
      console.log('❌ Organization query error:', orgError);
    } else {
      console.log('✅ Organization query successful!');
      console.log(`Found ${orgData.length} organizations`);
      if (orgData.length > 0) {
        console.log('First organization:', orgData[0]);
      }
    }
    
    // Try to list storage buckets
    console.log('\nListing storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('❌ Failed to list buckets:', bucketsError.message);
    } else {
      console.log('✅ Storage buckets:');
      console.log(buckets);
    }
    
  } catch (error) {
    console.error('❌ Supabase client error:', error.message);
  }
}

// Run the test
testUpdatedClient();
