import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing Supabase connection from API route...');
    
    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json(
        { error: 'Missing Supabase credentials' },
        { status: 500 }
      );
    }
    
    console.log(`Supabase URL: ${supabaseUrl}`);
    console.log(`Service Key (last 4): ****${supabaseServiceKey.slice(-4)}`);
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    // Try to query the organization table
    console.log('Attempting to query organization table...');
    const { data, error } = await supabase
      .from('organization')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Query error:', error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      data: data,
      count: data?.length || 0
    });
    
  } catch (error: any) {
    console.error('Supabase connection error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
