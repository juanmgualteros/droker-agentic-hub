// Script to fix URLs in .env file
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Function to fix markdown-formatted URLs
function fixMarkdownUrls(envContent) {
  // Regular expression to match markdown links in the format [url](url)
  const markdownLinkRegex = /\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  
  // Replace markdown links with just the URL
  return envContent.replace(markdownLinkRegex, (match, url) => {
    console.log(`Fixing URL: ${match} -> ${url}`);
    return url;
  });
}

// Path to the .env file
const envPath = path.join(__dirname, '.env');

try {
  // Read the current .env file
  console.log('Reading .env file...');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Fix the URLs
  const fixedContent = fixMarkdownUrls(envContent);
  
  // Write the fixed content to a new file
  const newEnvPath = path.join(__dirname, '.env.fixed');
  fs.writeFileSync(newEnvPath, fixedContent);
  
  console.log(`
✅ Fixed environment variables saved to .env.fixed

To update your .env file, you can:
1. Review the .env.fixed file to ensure it's correct
2. Replace your .env file with the fixed version:
   cp .env.fixed .env

The following URLs were fixed:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_SITE_URL
`);

} catch (error) {
  console.error('Error processing .env file:', error);
}
