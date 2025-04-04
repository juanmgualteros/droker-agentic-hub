// Check environment variables
require('dotenv').config();

console.log('Checking environment variables...\n');

// Database URL (for Prisma)
const dbUrl = process.env.DATABASE_URL;
console.log('DATABASE_URL:');
if (dbUrl) {
  // Hide password in output
  const sanitizedUrl = dbUrl.replace(/:[^:@]*@/, ':****@');
  console.log(`✅ Found: ${sanitizedUrl}`);
  
  // Check if URL format is correct
  try {
    const url = new URL(dbUrl);
    console.log(`  Protocol: ${url.protocol}`);
    console.log(`  Host: ${url.hostname}`);
    console.log(`  Port: ${url.port}`);
    console.log(`  Username: ${url.username}`);
    console.log(`  Password: ${'*'.repeat(url.password.length)}`);
    console.log(`  Path: ${url.pathname}`);
  } catch (e) {
    console.log(`❌ Invalid URL format: ${e.message}`);
  }
} else {
  console.log('❌ Missing DATABASE_URL');
}

// Supabase credentials
console.log('\nNEXT_PUBLIC_SUPABASE_URL:');
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.log(`✅ Found: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
} else {
  console.log('❌ Missing NEXT_PUBLIC_SUPABASE_URL');
}

console.log('\nNEXT_PUBLIC_SUPABASE_ANON_KEY:');
if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log(`✅ Found: ${key.substring(0, 3)}${'*'.repeat(key.length - 7)}${key.substring(key.length - 4)}`);
} else {
  console.log('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Check if there's a service role key (which has more permissions)
console.log('\nSUPABASE_SERVICE_ROLE_KEY:');
if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  console.log(`✅ Found: ${key.substring(0, 3)}${'*'.repeat(key.length - 7)}${key.substring(key.length - 4)}`);
} else {
  console.log('❌ Missing SUPABASE_SERVICE_ROLE_KEY (this is optional but recommended for server-side operations)');
}
