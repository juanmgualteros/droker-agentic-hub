require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Helper to check if a value looks like a full URL
function isValidURL(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Instructions for production
console.log('=== PRODUCTION ORGANIZATION CHECK ===');
console.log('To check your production environment:');
console.log('1. Go to Vercel dashboard, select your project');
console.log('2. Click on "Settings" tab, then "Environment Variables"');
console.log('3. Copy the NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY values');
console.log('4. Run this script with those values:');
console.log('   NEXT_PUBLIC_SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_key node check-prod-organization.js');
console.log('=== END INSTRUCTIONS ===\n');

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
const errors = [];
if (!supabaseUrl) {
  errors.push('NEXT_PUBLIC_SUPABASE_URL is not set');
} else if (!isValidURL(supabaseUrl)) {
  errors.push(`NEXT_PUBLIC_SUPABASE_URL (${supabaseUrl}) does not appear to be a valid URL`);
}

if (!supabaseServiceKey) {
  errors.push('SUPABASE_SERVICE_ROLE_KEY is not set');
} else if (supabaseServiceKey.length < 20) {
  errors.push('SUPABASE_SERVICE_ROLE_KEY looks too short to be valid');
}

if (errors.length > 0) {
  console.error('Environment validation errors:');
  errors.forEach(err => console.error(`- ${err}`));
  console.error('\nPlease fix these issues and try again.');
  process.exit(1);
}

// Create Supabase client
console.log('Creating Supabase client with:', {
  url: supabaseUrl.substring(0, 12) + '***', // Only show part of the URL for security
  keyLength: supabaseServiceKey.length
});

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkOrganizationAccess() {
  try {
    console.log('\nTesting Organization table access...');
    
    // Try to query the Organization table
    const { data: organizations, error } = await supabase
      .from('Organization')
      .select('*');

    if (error) {
      console.error('ERROR accessing Organization table:', error);
      
      if (error.message.includes('permission denied') || error.message.includes('42501')) {
        console.log('\nPermission denied error detected. This means:');
        console.log('1. The table exists but you don\'t have access to it');
        console.log('2. You need to apply RLS policies in your Supabase production instance');
        console.log('\nGo to your Supabase production dashboard:');
        console.log('- Go to SQL Editor');
        console.log('- Run these commands:');
        console.log(`
-- Enable RLS on Organization table if not already enabled
ALTER TABLE public."Organization" ENABLE ROW LEVEL SECURITY;

-- Create policy for service_role to allow all operations
CREATE POLICY "service_role_all_operations_organization" 
ON public."Organization" 
FOR ALL 
TO service_role 
USING (auth.role() = 'service_role');

-- Grant usage on public schema to service role (if needed)
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
        `);
      }
      
      return;
    }

    console.log(`SUCCESS! Found ${organizations?.length || 0} organizations:`);
    (organizations || []).forEach((org, i) => {
      console.log(`  ${i+1}. ${org.name} (ID: ${org.id})`);
    });
    
    console.log('\nYour RLS policies are working correctly for the Organization table!');
    console.log('If you still can\'t see organizations in your production app, check:');
    console.log('1. The environment variables in Vercel are set correctly');
    console.log('2. Your client code is correctly using the service role when needed');
    console.log('3. Your auth cookies are being properly passed between client/server components');

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Run the test
checkOrganizationAccess().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
