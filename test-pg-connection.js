// test-pg-connection.js
const { Client } = require('pg');
const readline = require('readline');

// Create readline interface for password input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function testConnection() {
  // Get password from command line
  const password = await new Promise((resolve) => {
    rl.question('Enter your Supabase database password: ', (answer) => {
      resolve(answer);
    });
  });
  
  // Close the readline interface
  rl.close();
  
  // Use the connection string format from your Supabase dashboard
  const connectionString = `postgresql://postgres:${password}@db.qvasgxzdjmldhbinbrgw.supabase.co:5432/postgres`;
  console.log(`Connecting to: postgresql://postgres:***@db.qvasgxzdjmldhbinbrgw.supabase.co:5432/postgres`);
  
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Supabase connections
    },
    // Force IPv4 connections
    family: 4
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connection successful!');
    
    const res = await client.query('SELECT NOW()');
    console.log('Current time in database:', res.rows[0]);
    
    // Test a simple query to check if organizations table exists
    try {
      const orgRes = await client.query('SELECT COUNT(*) FROM organization');
      console.log('Organization count:', orgRes.rows[0]);
    } catch (err) {
      console.error('Error querying organization table:', err.message);
    }
    
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

testConnection();
