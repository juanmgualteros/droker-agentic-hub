// Detailed Supabase connection test
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseConnection() {
  console.log('=== DETAILED SUPABASE CONNECTION TEST ===\n');
  
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
    
    // Try to get the current user to verify auth is working
    console.log('\nChecking auth status...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.log('❌ Auth error:', authError.message);
    } else if (user) {
      console.log('✅ Auth successful!');
      console.log(`Authenticated as: ${user.email || 'service role'}`);
    } else {
      console.log('⚠️ No user found, but no error (expected with service role)');
    }
    
    // Try to query the organization table
    console.log('\nAttempting to query organization table...');
    try {
      const { data, error } = await supabase
        .from('organization')
        .select('*')
        .limit(1);
      
      if (error) {
        console.log('❌ Query error:', error);
        
        // Check if this is a permissions issue
        if (error.code === '42501') {
          console.log('\n⚠️ This is a permissions issue. Possible causes:');
          console.log('1. RLS policies might not be taking effect immediately');
          console.log('2. The table name might be different (case sensitive)');
          console.log('3. The schema might not be "public"');
          
          // Try with explicit schema
          console.log('\nTrying with explicit schema reference...');
          const { data: schemaData, error: schemaError } = await supabase
            .from('public.organization')
            .select('*')
            .limit(1);
            
          if (schemaError) {
            console.log('❌ Explicit schema query failed:', schemaError);
          } else {
            console.log('✅ Explicit schema query worked!');
            console.log('Data:', schemaData);
          }
        }
      } else {
        console.log('✅ Query successful!');
        console.log('Data:', data);
      }
    } catch (queryError) {
      console.log('❌ Exception during query:', queryError);
    }
    
    // Try to list all tables
    console.log('\nAttempting to list all tables...');
    try {
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_tables')
        .select('*');
      
      if (tablesError) {
        console.log('❌ Error listing tables:', tablesError);
        console.log('\nTrying alternative approach to list tables...');
        
        // Try a direct query to information_schema
        const { data: infoSchema, error: infoError } = await supabase
          .from('information_schema.tables')
          .select('table_schema, table_name')
          .eq('table_schema', 'public');
          
        if (infoError) {
          console.log('❌ Information schema query failed:', infoError);
        } else {
          console.log('✅ Found tables via information_schema:');
          console.log(infoSchema);
        }
      } else {
        console.log('✅ Tables found:');
        console.log(tables);
      }
    } catch (listError) {
      console.log('❌ Exception while listing tables:', listError);
    }
    
  } catch (error) {
    console.error('❌ Supabase client error:', error);
  }
}

// Run the test
testSupabaseConnection();
