import { Suspense } from "react";
import { SuperAdminDashboard } from "@/components/superadmin/dashboard";

export default function SuperAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Super Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage system-wide settings and configurations
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <SuperAdminDashboard />
      </Suspense>
    </div>
  );
} 