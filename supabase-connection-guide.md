# Supabase Connection Guide

## Enabling Direct Database Access

To allow Prisma to connect directly to your Supabase PostgreSQL database, follow these steps:

1. Log in to your Supabase dashboard: https://app.supabase.com
2. Navigate to your project
3. Go to **Project Settings** > **Database** > **Connection Pooling**
4. Enable **Connection Pooling** if it's not already enabled
5. Go to **Project Settings** > **Database** > **Network Restrictions**
6. Under **IP Allow List**, add your current IP address
   - You can find your IP by searching "what is my ip" on Google
   - Click "Add IP Address" and enter your IP
   - Alternatively, you can temporarily allow all IP addresses for testing (not recommended for production)

## Using Supabase REST API Instead of Direct Connection

If direct database access isn't working, you can modify your application to use the Supabase REST API instead:

1. Create a new file at `src/lib/supabase/rest-client.ts` with the following content:

```typescript
import { createClient } from '@supabase/supabase-js';

// Check if the required environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseServiceKey) {
  console.error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY');
}

// Create a Supabase client with the service role key for admin operations
export const supabaseRest = createClient(
  supabaseUrl || '',
  supabaseServiceKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Helper function to safely execute Supabase queries with proper error handling
 */
export async function executeQuery<T>(
  tableName: string,
  queryFn: (query: any) => any
): Promise<T[]> {
  try {
    const query = supabaseRest.from(tableName).select('*');
    const modifiedQuery = queryFn(query);
    const { data, error } = await modifiedQuery;
    
    if (error) {
      console.error(`Error querying ${tableName}:`, error);
      throw new Error(`Failed to query ${tableName}: ${error.message}`);
    }
    
    return data as T[];
  } catch (err: any) {
    console.error(`Error executing query on ${tableName}:`, err);
    throw new Error(`Database operation failed: ${err.message}`);
  }
}

// Example usage:
// const organizations = await executeQuery('organization', (query) => query.limit(10));
```

2. Then, use this client in your API routes instead of Prisma.

## Verifying RLS Policies

To ensure your RLS policies are correctly set up:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** > **Policies**
3. For each table, verify that you have a policy with:
   - Using expression: `auth.role() = 'service_role'`
   - Target roles: service_role
   - Policy applied to: ALL operations
4. If the policies exist but aren't working, try:
   - Deleting and recreating the policies
   - Ensuring the table names match exactly (case-sensitive)
   - Checking if there are conflicting policies

## Testing Connection

After making these changes, run the following test to verify your connection:

```bash
node test-updated-client.js
```

If you're still experiencing issues, consider:
1. Checking Supabase logs for any errors
2. Verifying that your service role key is correct and has the necessary permissions
3. Contacting Supabase support for assistance with your specific project configuration
