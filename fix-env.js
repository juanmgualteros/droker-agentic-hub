// Script to fix the .env file with the correct database connection string
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function fixEnvFile() {
  console.log('=== FIXING .ENV FILE WITH CORRECT CONNECTION STRING ===\n');
  
  const envPath = path.join(process.cwd(), '.env');
  
  try {
    // Check if .env file exists
    if (!fs.existsSync(envPath)) {
      console.error('❌ .env file not found');
      return;
    }
    
    // Read the current .env file
    let envContent = fs.readFileSync(envPath, 'utf8');
    console.log('Current .env file read successfully');
    
    // Define the correct connection string
    const correctDbUrl = 'postgresql://postgres:zygxeD-kitfin-mogpo4@db.qvasgxzdjmldhbinbrgw.supabase.co:5432/postgres';
    
    // Check if the DATABASE_URL needs to be updated
    if (envContent.includes('DATABASE_URL=')) {
      console.log('Found DATABASE_URL in .env file');
      
      // Replace the entire DATABASE_URL line
      const updatedContent = envContent.replace(
        /DATABASE_URL=.+/,
        `DATABASE_URL=${correctDbUrl}`
      );
      
      if (updatedContent !== envContent) {
        // Write the updated content back to the .env file
        fs.writeFileSync(envPath, updatedContent);
        console.log('✅ DATABASE_URL updated successfully to:');
        console.log(correctDbUrl);
      } else {
        console.log('⚠️ No changes made to DATABASE_URL');
      }
    } else {
      console.log('⚠️ DATABASE_URL not found in .env file');
      console.log('Adding DATABASE_URL to .env file...');
      
      // Add the DATABASE_URL to the .env file
      envContent += `\n# Corrected Database URL\nDATABASE_URL=${correctDbUrl}\n`;
      
      // Write the updated content back to the .env file
      fs.writeFileSync(envPath, envContent);
      console.log('✅ DATABASE_URL added to .env file');
    }
    
    console.log('\n=== NEXT STEPS ===');
    console.log('1. Run "npm run build" to apply the changes');
    console.log('2. Restart your development server');
    console.log('3. Test the Supabase connection again');
    
  } catch (error) {
    console.error('❌ Error updating .env file:', error);
  }
}

// Run the fix function
fixEnvFile();
