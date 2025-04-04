require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Check if the required environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const databaseUrl = process.env.DATABASE_URL;

console.log('Environment check:');
console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? 'Present' : 'MISSING'}`);
console.log(`- SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? 'Present' : 'MISSING'}`);
console.log(`- DATABASE_URL: ${databaseUrl ? 'Present' : 'MISSING'}`);

// Create Supabase client with service role key
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

async function testOrganizationTable() {
  console.log('\n--- Testing Organization Table Access ---');
  
  try {
    // Attempt to get all organizations
    console.log('Attempting to fetch organizations...');
    const { data: organizations, error } = await supabase
      .from('organization')
      .select('*');
    
    if (error) {
      console.error('Error fetching organizations:', error);
      
      // Test if we can access the RLS policy for this table
      console.log('\nChecking RLS policy status...');
      const { data: policies, error: policyError } = await supabase
        .rpc('get_policies')
        .eq('tablename', 'organization');
      
      if (policyError) {
        console.error('Error fetching policies:', policyError);
      } else {
        console.log('Policies found:', policies?.length || 0);
        console.log(policies);
      }
      
      return;
    }
    
    console.log(`Successfully fetched ${organizations?.length || 0} organizations`);
    console.log('First few organizations:');
    (organizations || []).slice(0, 3).forEach((org, i) => {
      console.log(`  ${i+1}. ${org.name} (ID: ${org.id})`);
    });
    
    // Test RLS policy explicitly
    console.log('\nVerifying RLS policy is working...');
    const { data: policies, error: policyError } = await supabase
      .rpc('get_policies')
      .eq('tablename', 'organization');
    
    if (policyError) {
      console.error('Error fetching policies:', policyError);
    } else {
      const serviceRolePolicy = (policies || []).find(p => 
        p.definition && p.definition.includes('service_role')
      );
      
      if (serviceRolePolicy) {
        console.log('Found service_role policy for organization table:', serviceRolePolicy);
      } else {
        console.log('WARNING: No explicit service_role policy found for organization table');
        console.log('Available policies:', policies);
      }
    }
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Create a custom function to check policies
async function createPolicyFunction() {
  try {
    console.log('\n--- Creating Policy Check Function ---');
    const sql = `
      CREATE OR REPLACE FUNCTION public.get_policies()
      RETURNS TABLE (
        tablename text,
        policyname text,
        roles text[],
        cmd text,
        definition text
      )
      LANGUAGE sql SECURITY DEFINER
      AS $$
        SELECT
          n.nspname::text || '.' || c.relname::text as tablename,
          p.policyname::text,
          ARRAY(
            SELECT rolname::text
            FROM pg_roles
            WHERE oid = ANY(p.polroles)
          ),
          CASE p.polcmd
            WHEN 'r' THEN 'SELECT'
            WHEN 'a' THEN 'INSERT'
            WHEN 'w' THEN 'UPDATE'
            WHEN 'd' THEN 'DELETE'
            WHEN '*' THEN 'ALL'
          END,
          pg_get_expr(p.polqual, p.polrelid)
        FROM pg_policy p
        JOIN pg_class c ON p.polrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid;
      $$;
    `;
    
    // Execute the SQL to create the function
    const { error } = await supabase.rpc('get_policies');
    
    if (error && error.message.includes('function "get_policies" does not exist')) {
      console.log('Creating get_policies function...');
      // Create function using raw SQL 
      const { error: sqlError } = await supabase.rpc('exec_sql', { sql });
      
      if (sqlError) {
        if (sqlError.message.includes('permission denied')) {
          console.error('Permission denied to create function. You need superuser privileges.');
          console.log('Skipping function creation - will use alternative method');
        } else {
          console.error('Error creating function:', sqlError);
        }
      } else {
        console.log('Successfully created get_policies function');
      }
    } else if (!error) {
      console.log('get_policies function already exists');
    }
  } catch (err) {
    console.error('Error setting up policy function:', err);
  }
}

// Main execution
async function main() {
  console.log('Testing Supabase connection for organization table...');
  
  // Try to create the policy function or skip if not possible
  await createPolicyFunction().catch(err => {
    console.error('Error in policy function setup:', err);
  });
  
  // Test organization table access
  await testOrganizationTable();
  
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
