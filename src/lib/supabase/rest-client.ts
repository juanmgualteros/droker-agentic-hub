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
 * Example helper functions for common database operations
 */

/**
 * Find many records from a table
 */
export async function findMany<T>(
  tableName: string, 
  options?: { 
    limit?: number; 
    offset?: number;
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    filter?: Record<string, any>;
  }
): Promise<T[]> {
  try {
    let query = supabaseRest.from(tableName).select(options?.select || '*');
    
    // Apply filters if provided
    if (options?.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    // Apply ordering if provided
    if (options?.orderBy) {
      query = query.order(
        options.orderBy.column,
        { ascending: options.orderBy.ascending ?? true }
      );
    }
    
    // Apply pagination if provided
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    if (options?.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 10) - 1
      );
    }
    
    const { data, error } = await query;
    
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

/**
 * Find a single record from a table
 */
export async function findUnique<T>(
  tableName: string,
  filter: Record<string, any>,
  options?: {
    select?: string;
  }
): Promise<T | null> {
  try {
    const query = supabaseRest
      .from(tableName)
      .select(options?.select || '*')
      .match(filter)
      .limit(1)
      .single();
    
    const { data, error } = await query;
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - not found
        return null;
      }
      
      console.error(`Error finding unique record in ${tableName}:`, error);
      throw new Error(`Failed to find record in ${tableName}: ${error.message}`);
    }
    
    return data as T;
  } catch (err: any) {
    console.error(`Error finding unique record in ${tableName}:`, err);
    throw new Error(`Database operation failed: ${err.message}`);
  }
}

/**
 * Create a new record in a table
 */
export async function create<T>(
  tableName: string,
  data: Record<string, any>
): Promise<T> {
  try {
    const { data: result, error } = await supabaseRest
      .from(tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw new Error(`Failed to create record in ${tableName}: ${error.message}`);
    }
    
    return result as T;
  } catch (err: any) {
    console.error(`Error creating record in ${tableName}:`, err);
    throw new Error(`Database operation failed: ${err.message}`);
  }
}

/**
 * Update a record in a table
 */
export async function update<T>(
  tableName: string,
  filter: Record<string, any>,
  data: Record<string, any>
): Promise<T> {
  try {
    const { data: result, error } = await supabaseRest
      .from(tableName)
      .update(data)
      .match(filter)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating record in ${tableName}:`, error);
      throw new Error(`Failed to update record in ${tableName}: ${error.message}`);
    }
    
    return result as T;
  } catch (err: any) {
    console.error(`Error updating record in ${tableName}:`, err);
    throw new Error(`Database operation failed: ${err.message}`);
  }
}

/**
 * Delete a record from a table
 */
export async function remove<T>(
  tableName: string,
  filter: Record<string, any>
): Promise<T> {
  try {
    const { data: result, error } = await supabaseRest
      .from(tableName)
      .delete()
      .match(filter)
      .select()
      .single();
    
    if (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw new Error(`Failed to delete record from ${tableName}: ${error.message}`);
    }
    
    return result as T;
  } catch (err: any) {
    console.error(`Error deleting record from ${tableName}:`, err);
    throw new Error(`Database operation failed: ${err.message}`);
  }
}
