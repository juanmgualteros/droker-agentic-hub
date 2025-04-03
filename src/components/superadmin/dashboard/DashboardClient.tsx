"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  FileText, 
  Activity, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DashboardClientProps {
  stats: {
    totalOrganizations: number;
    activeOrganizations: number;
    totalUsers: number;
    totalProducts: number;
    systemHealth: {
      status: 'healthy' | 'warning' | 'critical';
      uptime: string;
      lastIncident: string | null;
    };
    recentActivity: {
      id: string;
      action: string;
      entity: string;
      timestamp: string;
      user: string;
    }[];
  };
}

export default function DashboardClient({ stats }: DashboardClientProps) {
  const getHealthColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-amber-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getHealthIcon = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-foreground font-comfortaa">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground font-comfortaa">
          Overview of your platform statistics and performance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-background border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground font-comfortaa text-sm font-normal flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-primary" />
              Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-foreground">{stats.totalOrganizations}</div>
            <p className="text-xs text-muted-foreground mt-1 font-comfortaa">
              {stats.activeOrganizations} active
            </p>
            <Progress 
              value={(stats.activeOrganizations / stats.totalOrganizations) * 100} 
              className="h-1 mt-2" 
            />
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground font-comfortaa text-sm font-normal flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-foreground">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1 font-comfortaa">
              Across all organizations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground font-comfortaa text-sm font-normal flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-foreground">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1 font-comfortaa">
              Total configured products
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground font-comfortaa text-sm font-normal flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {getHealthIcon(stats.systemHealth.status)}
              <span className={`text-lg font-light ml-2 ${getHealthColor(stats.systemHealth.status)}`}>
                {stats.systemHealth.status.charAt(0).toUpperCase() + stats.systemHealth.status.slice(1)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-comfortaa">
              Uptime: {stats.systemHealth.uptime}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-background border-border">
          <CardHeader>
            <CardTitle className="text-foreground font-comfortaa text-lg font-light">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground font-comfortaa">
              Latest actions across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b border-border">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground font-comfortaa">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground font-comfortaa">
                      {activity.entity} • {activity.user}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground font-comfortaa">
                    {new Date(activity.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="font-comfortaa">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle className="text-foreground font-comfortaa text-lg font-light">Quick Actions</CardTitle>
            <CardDescription className="text-muted-foreground font-comfortaa">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild className="w-full justify-start font-comfortaa" variant="outline">
                <Link href="/superadmin/organizations/new">
                  <Building2 className="mr-2 h-4 w-4" />
                  Create Organization
                </Link>
              </Button>
              <Button asChild className="w-full justify-start font-comfortaa" variant="outline">
                <Link href="/superadmin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button asChild className="w-full justify-start font-comfortaa" variant="outline">
                <Link href="/superadmin/settings">
                  <Activity className="mr-2 h-4 w-4" />
                  System Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
