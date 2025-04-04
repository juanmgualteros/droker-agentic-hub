// Script to check environment variables and generate 
// commands to set them in Vercel
require('dotenv').config();

console.log('Environment check for Supabase connection:');
console.log('-----------------------------------------');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL'
];

let allPresent = true;
const missingVars = [];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName} - MISSING!`);
    allPresent = false;
    missingVars.push(varName);
  } else {
    // Only show partial values for security
    let maskedValue;
    if (varName === 'NEXT_PUBLIC_SUPABASE_URL') {
      maskedValue = value;
    } else {
      maskedValue = value.substring(0, 4) + '...' + value.substring(value.length - 4);
    }
    console.log(`✅ ${varName} - ${maskedValue}`);
  }
});

console.log('\n');

if (allPresent) {
  console.log('✅ All required environment variables are present.');
  
  console.log('\nTo set these in Vercel, you can run these commands:');
  requiredVars.forEach(varName => {
    console.log(`vercel env add ${varName}`);
  });
} else {
  console.log('❌ Missing some required environment variables!');
  console.log('\nMissing variables:');
  missingVars.forEach(varName => {
    console.log(`- ${varName}`);
  });
}

console.log('\nTo ensure your Vercel deployment has these environment variables:');
console.log('1. Go to your Vercel project dashboard');
console.log('2. Navigate to Settings > Environment Variables');
console.log('3. Add each of the missing variables');
console.log('4. Redeploy your application');
