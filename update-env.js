// Script to update the .env file with the correct database connection string
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function updateEnvFile() {
  console.log('=== UPDATING .ENV FILE WITH CORRECT CONNECTION STRING ===\n');
  
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
    
    // Check if the DATABASE_URL needs to be updated
    const currentDbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
    if (currentDbUrlMatch) {
      const currentDbUrl = currentDbUrlMatch[1];
      console.log(`Current DATABASE_URL: ${currentDbUrl}`);
      
      // Check if it contains the incorrect hostname
      if (currentDbUrl.includes('supabase-postgres.co')) {
        console.log('❌ Found incorrect hostname in DATABASE_URL');
        
        // Create the corrected URL
        const correctedDbUrl = currentDbUrl.replace(
          /postgres:\/\/(.+)@.+?\.supabase-postgres\.co/,
          'postgres://$1@db.qvasgxzdjmldhbinbrgw.supabase.co'
        );
        
        console.log(`✅ Corrected DATABASE_URL: ${correctedDbUrl}`);
        
        // Update the .env file
        envContent = envContent.replace(
          /DATABASE_URL=.+/,
          `DATABASE_URL=${correctedDbUrl}`
        );
        
        // Write the updated content back to the .env file
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file updated successfully');
      } else if (currentDbUrl.includes('db.qvasgxzdjmldhbinbrgw.supabase.co')) {
        console.log('✅ DATABASE_URL already has the correct hostname');
      } else {
        console.log('⚠️ DATABASE_URL has an unexpected format, manual update recommended');
        console.log('Recommended DATABASE_URL: postgresql://postgres:zygxeD-kitfin-mogpo4@db.qvasgxzdjmldhbinbrgw.supabase.co:5432/postgres');
      }
    } else {
      console.log('⚠️ DATABASE_URL not found in .env file');
      console.log('Adding DATABASE_URL to .env file...');
      
      // Add the DATABASE_URL to the .env file
      envContent += '\n# Corrected Database URL\nDATABASE_URL=postgresql://postgres:zygxeD-kitfin-mogpo4@db.qvasgxzdjmldhbinbrgw.supabase.co:5432/postgres\n';
      
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

// Run the update function
updateEnvFile();
