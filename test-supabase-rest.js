// Test Supabase connection using REST API
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseRest() {
  console.log('=== TESTING SUPABASE REST API CONNECTION ===\n');
  
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
    console.log('\nCreating Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Test a simple health check
    console.log('\nPerforming health check...');
    const { data: health, error: healthError } = await supabase.rpc('ping');
    
    if (healthError) {
      console.log('❌ Health check failed:', healthError.message);
      console.log('Trying alternative health check...');
      
      // Try to get the current timestamp from Supabase
      const { data: time, error: timeError } = await supabase.rpc('get_timestamp');
      
      if (timeError) {
        console.log('❌ Alternative health check failed:', timeError.message);
      } else {
        console.log('✅ Alternative health check successful!');
        console.log('Server time:', time);
      }
    } else {
      console.log('✅ Health check successful!');
      console.log('Response:', health);
    }
    
    // Try to get server version
    console.log('\nGetting server version...');
    const { data: version, error: versionError } = await supabase.rpc('get_server_version');
    
    if (versionError) {
      console.log('❌ Failed to get server version:', versionError.message);
    } else {
      console.log('✅ Server version:', version);
    }
    
    // Test auth status
    console.log('\nChecking auth status...');
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('❌ Auth error:', authError.message);
    } else if (session) {
      console.log('✅ Auth session found!');
      console.log('User:', session.user.email);
    } else {
      console.log('⚠️ No auth session (expected with service role)');
    }
    
    // Try to list buckets (storage)
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
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

// Run the test
testSupabaseRest();
