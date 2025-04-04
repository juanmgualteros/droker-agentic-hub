import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // Check if environment variables are set
    const missingVars = [];
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missingVars.push('SUPABASE_SERVICE_ROLE_KEY');
    
    if (missingVars.length > 0) {
      return NextResponse.json({
        error: 'Missing environment variables',
        missing: missingVars,
        environment: process.env.NODE_ENV,
        hint: 'Please add these variables to your Vercel project settings'
      }, { status: 500 });
    }
    
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
          details: error,
          environment: process.env.NODE_ENV,
          serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          supabaseUrlPresent: !!process.env.NEXT_PUBLIC_SUPABASE_URL
        }, 
        { status: 500 }
      );
    }
    
    // Return success with count
    return NextResponse.json({ 
      success: true, 
      count: data.length,
      environment: process.env.NODE_ENV,
      supabaseUrlPresent: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      // Don't include actual data for security
    });
  } catch (err: any) {
    return NextResponse.json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      environment: process.env.NODE_ENV
    }, { status: 500 });
  }
}
