import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Check for missing environment variables
    const missingVars = [];
    if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!supabaseServiceKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY');

    if (missingVars.length > 0) {
      return NextResponse.json({
        error: `Missing environment variables: ${missingVars.join(', ')}`,
        status: 'error'
      }, { status: 500 });
    }

    // Create Supabase admin client
    const supabase = createClient(supabaseUrl as string, supabaseServiceKey as string, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Try to query the Organization table
    const { data: organizations, error } = await supabase
      .from('Organization')
      .select('*')
      .limit(5);

    if (error) {
      return NextResponse.json({
        error: `Database error: ${error.message}`,
        details: error,
        status: 'error'
      }, { status: 500 });
    }

    // Try to list all tables
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('schemaname, tablename')
      .eq('schemaname', 'public');
      
    // Return both results
    return NextResponse.json({
      status: 'success',
      organizations: organizations || [],
      organizationCount: organizations?.length || 0,
      tables: tables?.map(t => t.tablename) || [],
      environment: {
        supabaseUrl: supabaseUrl?.substring(0, 12) + '...' // Only show part of the URL for security
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      error: `Unexpected error: ${error.message}`,
      status: 'error'
    }, { status: 500 });
  }
}
