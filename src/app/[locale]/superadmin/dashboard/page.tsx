import { prisma } from '@/lib/prisma';
import DashboardClient from '@/components/superadmin/dashboard/DashboardClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getDashboardStats() {
  try {
    // Get organizations count
    const organizations = await prisma.organization.findMany({
      include: {
        subscription: true,
        users: true,
        products: true,
      },
    });

    const totalOrganizations = organizations.length;
    const activeOrganizations = organizations.filter(
      org => org.subscription?.status === 'ACTIVE'
    ).length;

    // Get total users count
    const totalUsers = organizations.reduce(
      (acc, org) => acc + org.users.length, 
      0
    );

    // Get total products count
    const totalProducts = organizations.reduce(
      (acc, org) => acc + org.products.length, 
      0
    );

    // Get recent activity (would typically come from an audit log table)
    // This is mock data for now
    const recentActivity = [
      {
        id: '1',
        action: 'Organization Created',
        entity: 'Acme Corp',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        user: 'admin@example.com',
      },
      {
        id: '2',
        action: 'User Added',
        entity: 'john.doe@acme.com',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        user: 'admin@example.com',
      },
      {
        id: '3',
        action: 'Product Configured',
        entity: 'AI Assistant',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        user: 'admin@acme.com',
      },
      {
        id: '4',
        action: 'API Key Generated',
        entity: 'OpenAI Integration',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        user: 'admin@techcorp.com',
      },
      {
        id: '5',
        action: 'Subscription Updated',
        entity: 'Tech Corp - Enterprise Plan',
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        user: 'admin@example.com',
      },
    ];

    // Calculate system uptime (mock data)
    const uptimeHours = Math.floor(Math.random() * 1000) + 500;
    const uptimeDays = Math.floor(uptimeHours / 24);
    const remainingHours = uptimeHours % 24;
    const uptime = `${uptimeDays}d ${remainingHours}h`;

    // System health status (mock data)
    const healthStatuses = ['healthy', 'warning', 'critical'] as const;
    const healthStatus = healthStatuses[0]; // Always healthy for demo

    return {
      totalOrganizations,
      activeOrganizations,
      totalUsers,
      totalProducts,
      systemHealth: {
        status: healthStatus,
        uptime,
        lastIncident: null,
      },
      recentActivity,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalOrganizations: 0,
      activeOrganizations: 0,
      totalUsers: 0,
      totalProducts: 0,
      systemHealth: {
        status: 'critical' as const,
        uptime: 'Unknown',
        lastIncident: new Date().toISOString(),
      },
      recentActivity: [],
    };
  }
}

export default async function DashboardPage({
  params
}: {
  params: { locale: string }
}) {
  // Check if user is authenticated and has superadmin role
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || userRole !== 'superadmin') {
    redirect(`/${params.locale}/login`);
  }

  try {
    const stats = await getDashboardStats();
    return <DashboardClient stats={stats} />;
  } catch (error) {
    console.error('Error in DashboardPage:', error);
    redirect(`/${params.locale}/error`);
  }
}

// Disable static page generation
export const dynamic = 'force-dynamic';
