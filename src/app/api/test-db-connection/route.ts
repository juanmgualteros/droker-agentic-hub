import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // Test connection
    const { data, error } = await supabaseAdmin
      .from('ApiKey')
      .select('*')
      .limit(5);
    
    if (error) {
      return NextResponse.json(
        { 
          error: error.message,
          hint: 'Check Supabase connection settings and RLS policies',
          details: error 
        }, 
        { status: 500 }
      );
    }
    
    // Return success with count
    return NextResponse.json({ 
      success: true, 
      count: data.length,
      environment: process.env.NODE_ENV,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      // Don't include actual data for security
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
