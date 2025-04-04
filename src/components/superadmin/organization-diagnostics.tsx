'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function OrganizationDiagnostics() {
  const [diagnosticInfo, setDiagnosticInfo] = useState<any>({
    status: 'Loading...',
    error: null,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set',
    anonKeyStatus: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set ✓' : 'Not set ✗',
    envCheck: {},
    timestamp: new Date().toISOString(),
    data: null
  });

  useEffect(() => {
    async function checkConnection() {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          throw new Error('Missing required Supabase environment variables');
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Test connection by trying to get auth user
        const { data: authData, error: authError } = await supabase.auth.getUser();
        
        // Try to get organizations with anonymous key
        const { data: orgData, error: orgError } = await supabase
          .from('Organization')
          .select('*');

        setDiagnosticInfo({
          status: 'Complete',
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          anonKeyStatus: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set ✓' : 'Not set ✗',
          authCheck: {
            result: authError ? 'Failed' : 'Success',
            error: authError ? authError.message : null,
            data: authData ? 'Auth data received' : 'No auth data'
          },
          orgCheck: {
            result: orgError ? 'Failed' : 'Success',
            error: orgError ? orgError.message : null,
            count: orgData ? orgData.length : 0
          },
          timestamp: new Date().toISOString(),
          data: orgData || null
        });
      } catch (error: any) {
        setDiagnosticInfo({
          status: 'Error',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-8 text-sm">
      <h3 className="text-lg font-semibold mb-4">Organization Table Diagnostics</h3>
      
      <div className="mb-4">
        <div className="font-semibold">Status:</div>
        <div className="ml-4">{diagnosticInfo.status}</div>
      </div>

      <div className="mb-4">
        <div className="font-semibold">Supabase URL:</div>
        <div className="ml-4">{diagnosticInfo.supabaseUrl}</div>
      </div>

      <div className="mb-4">
        <div className="font-semibold">Anon Key Status:</div>
        <div className="ml-4">{diagnosticInfo.anonKeyStatus}</div>
      </div>

      {diagnosticInfo.authCheck && (
        <div className="mb-4">
          <div className="font-semibold">Auth Check:</div>
          <div className="ml-4">Result: {diagnosticInfo.authCheck.result}</div>
          {diagnosticInfo.authCheck.error && (
            <div className="ml-4 text-red-500">Error: {diagnosticInfo.authCheck.error}</div>
          )}
        </div>
      )}

      {diagnosticInfo.orgCheck && (
        <div className="mb-4">
          <div className="font-semibold">Organization Table Check:</div>
          <div className="ml-4">Result: {diagnosticInfo.orgCheck.result}</div>
          {diagnosticInfo.orgCheck.error && (
            <div className="ml-4 text-red-500">Error: {diagnosticInfo.orgCheck.error}</div>
          )}
          <div className="ml-4">Count: {diagnosticInfo.orgCheck.count}</div>
        </div>
      )}

      {diagnosticInfo.error && (
        <div className="mb-4">
          <div className="font-semibold text-red-500">Error:</div>
          <div className="ml-4 text-red-500">{diagnosticInfo.error}</div>
        </div>
      )}

      {diagnosticInfo.data && (
        <div className="mb-4">
          <div className="font-semibold">Data Preview:</div>
          <pre className="ml-4 overflow-auto max-h-40 p-2 bg-gray-200 rounded">
            {JSON.stringify(diagnosticInfo.data, null, 2)}
          </pre>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-4">
        Timestamp: {diagnosticInfo.timestamp}
      </div>
    </div>
  );
}
