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
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceKey || '',
  {
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
  }
);

/**
 * Helper function to safely execute Supabase queries with proper error handling
 */
export async function executeAdminQuery<T>(
  queryFn: (client: typeof supabaseAdmin) => Promise<{ data: T | null; error: any }>
): Promise<T> {
  try {
    const { data, error } = await queryFn(supabaseAdmin);
    
    if (error) {
      console.error('Supabase query error:', error);
      throw new Error(`Supabase query failed: ${error.message}`);
    }
    
    if (data === null) {
      throw new Error('No data returned from Supabase query');
    }
    
    return data as T;
  } catch (err: any) {
    console.error('Error executing Supabase admin query:', err);
    throw new Error(`Database operation failed: ${err.message}`);
  }
}

/**
 * Example usage:
 * 
 * // Get all organizations
 * const organizations = await executeAdminQuery(client => 
 *   client.from('organization').select('*')
 * );
 * 
 * // Get a specific organization
 * const organization = await executeAdminQuery(client => 
 *   client.from('organization').select('*').eq('id', organizationId).single()
 * );
 */
