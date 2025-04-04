// Final test script to verify Supabase connection with corrected URL
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testFinalConnection() {
  console.log('=== FINAL SUPABASE CONNECTION TEST ===\n');
  
  // Get Supabase credentials from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const databaseUrl = process.env.DATABASE_URL;
  
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Service Key (last 4): ****${supabaseServiceKey?.slice(-4) || 'undefined'}`);
  console.log(`Database URL (hostname): ${databaseUrl?.replace(/:[^:@]*@/, ':****@').split('@')[1].split(':')[0] || 'undefined'}`);
  
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
    
    // Try to query the organization table
    console.log('\nAttempting to query organization table...');
    const { data, error } = await supabase
      .from('organization')
      .select('*')
      .limit(5);
    
    if (error) {
      console.log('❌ Query error:', error);
      
      // If we still have permission issues, let's check if we need to create RLS policies
      if (error.code === '42501' && error.message.includes('permission denied')) {
        console.log('\n⚠️ You still have permission issues. Here are the steps to fix them:');
        console.log('1. Log in to your Supabase dashboard: https://app.supabase.com');
        console.log('2. Go to your project > Authentication > Policies');
        console.log('3. For each table (organization, products, etc.), create a policy that allows the service role to access it:');
        console.log('   - Policy name: "Enable read access for service role"');
        console.log('   - Target roles: service_role');
        console.log('   - Using expression: auth.role() = \'service_role\'');
        console.log('   - Apply policy to: ALL operations');
        console.log('4. After creating the policies, wait a few minutes for them to take effect');
        console.log('5. Run this test script again to verify the connection');
      }
    } else {
      console.log('✅ Query successful!');
      console.log(`Found ${data.length} organizations`);
      if (data.length > 0) {
        console.log('First organization:', data[0]);
      }
      console.log('\n🎉 Your Supabase connection is working correctly!');
    }
    
    // Try to list storage buckets as another test
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
testFinalConnection();
