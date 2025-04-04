// Test Supabase schema and available tables
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseSchema() {
  console.log('Testing Supabase schema and available tables...');
  
  // Get Supabase credentials from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Using service role key: ${supabaseServiceKey ? 'Yes' : 'No'}`);
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Supabase credentials are missing in .env file');
    return;
  }
  
  try {
    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Test basic connection
    console.log('\nTesting basic connection...');
    try {
      const { data: healthCheck, error: healthError } = await supabase.from('_pgrst_reserved_id').select('*').limit(1);
      
      if (healthError) {
        console.log(`❌ Basic connection test failed: ${healthError.message}`);
      } else {
        console.log('✅ Basic connection successful!');
      }
    } catch (err) {
      console.log(`❌ Basic connection test failed: ${err.message}`);
    }
    

    
    // List all schemas
    console.log('\nAttempting to list available schemas...');
    const { data: schemas, error: schemaError } = await supabase
      .from('information_schema.schemata')
      .select('schema_name')
      .not('schema_name', 'like', 'pg_%')
      .not('schema_name', 'in', ['information_schema', 'net', 'tiger', 'tiger_data', 'topology'])
      .order('schema_name');
    
    if (schemaError) {
      console.log(`❌ Error listing schemas: ${schemaError.message}`);
    } else {
      console.log('✅ Available schemas:');
      schemas.forEach(schema => console.log(`  - ${schema.schema_name}`));
      
      // For each schema, try to list tables
      for (const schema of schemas) {
        const schemaName = schema.schema_name;
        console.log(`\nListing tables in schema '${schemaName}'...`);
        
        const { data: tables, error: tableError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', schemaName)
          .eq('table_type', 'BASE TABLE')
          .order('table_name');
        
        if (tableError) {
          console.log(`❌ Error listing tables in schema '${schemaName}': ${tableError.message}`);
        } else if (tables.length === 0) {
          console.log(`  No tables found in schema '${schemaName}'`);
        } else {
          console.log(`  Tables in schema '${schemaName}':`);
          tables.forEach(table => console.log(`    - ${table.table_name}`));
          
          // Try to query the first table in this schema
          if (tables.length > 0) {
            const firstTable = tables[0].table_name;
            console.log(`\n  Attempting to query first table '${schemaName}.${firstTable}'...`);
            
            const { data: rows, error: queryError } = await supabase
              .from(`${schemaName}.${firstTable}`)
              .select('*')
              .limit(1);
            
            if (queryError) {
              console.log(`  ❌ Error querying '${schemaName}.${firstTable}': ${queryError.message}`);
            } else {
              console.log(`  ✅ Successfully queried '${schemaName}.${firstTable}'!`);
              console.log(`  Found ${rows.length} rows`);
            }
          }
        }
      }
    }
    
    // Try to list Supabase auth tables
    console.log('\nAttempting to access Supabase auth tables...');
    const { data: authUsers, error: authError } = await supabase
      .from('auth.users')
      .select('*')
      .limit(1);
    
    if (authError) {
      console.log(`❌ Error accessing auth.users: ${authError.message}`);
    } else {
      console.log('✅ Successfully accessed auth.users!');
      console.log(`Found ${authUsers.length} users`);
    }
    
  } catch (error) {
    console.error('❌ Supabase connection error:');
    console.error(error);
  }
}

// Run the test
testSupabaseSchema();
