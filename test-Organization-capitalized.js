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
  console.log('\n--- Testing Organization Table Access (with capital O) ---');
  
  try {
    // Attempt to get all organizations with the correct case
    console.log('Attempting to fetch Organizations...');
    const { data: organizations, error } = await supabase
      .from('Organization')
      .select('*');
    
    if (error) {
      console.error('Error fetching Organizations:', error);
      return;
    }
    
    console.log(`Successfully fetched ${organizations?.length || 0} Organizations`);
    console.log('First few Organizations:');
    (organizations || []).slice(0, 3).forEach((org, i) => {
      console.log(`  ${i+1}. ${org.name} (ID: ${org.id})`);
    });
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Main execution
async function main() {
  console.log('Testing Supabase connection for Organization table (with capital O)...');
  
  // Test organization table access
  await testOrganizationTable();
  
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
