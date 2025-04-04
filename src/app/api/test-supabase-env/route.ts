import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Environment check
    const envCheck = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set ✓' : 'Missing ✗',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set ✓' : 'Missing ✗',
      serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set ✓' : 'Missing ✗',
      dbUrl: process.env.DATABASE_URL ? 'Set ✓' : 'Missing ✗',
      // Include the URL (but mask most of it for security)
      partialUrl: process.env.NEXT_PUBLIC_SUPABASE_URL 
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 12)}...${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(process.env.NEXT_PUBLIC_SUPABASE_URL.length - 8)}` 
        : 'Not available'
    };

    // Try to connect to Supabase and get organization data
    let supabaseResult = 'Not attempted';
    let organizationData = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            persistSession: false,
          }
        }
      );

      try {
        const { data, error } = await supabase
          .from('Organization')
          .select('*')
          .limit(1);
        
        if (error) {
          supabaseResult = `Error: ${error.message}`;
        } else {
          supabaseResult = 'Connection successful';
          organizationData = data;
        }
      } catch (err: any) {
        supabaseResult = `Exception: ${err.message}`;
      }
    }

    return NextResponse.json({
      environment: envCheck,
      supabaseConnection: supabaseResult,
      organizationData,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      error: `API error: ${error.message}`,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
