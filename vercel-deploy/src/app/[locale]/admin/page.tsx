import { Suspense } from "react";
import { StatsClient } from "@/components/admin/stats-client";
import { LoadingStats } from "@/components/admin/loading-stats";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to your organization's admin portal
        </p>
      </div>

      <Suspense fallback={<LoadingStats />}>
        <StatsClient />
      </Suspense>
    </div>
  );
} 