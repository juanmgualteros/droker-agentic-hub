"use client";

export function SuperAdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Total Organizations</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
      </div>
      <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Active Users</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
      </div>
      <div className="bg-white rounded-md shadow-sm p-6 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">System Status</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">Active</p>
      </div>
    </div>
  );
} 