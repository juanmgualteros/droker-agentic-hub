'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-foreground font-light">
                Menu
              </button>
              <h1 className="text-xl font-light text-foreground">Agentic Hub Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-foreground font-light">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-4">
            Welcome to Agentic Hub
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Your central dashboard for managing your organization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Super Admin Portal */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground text-center mb-2">Super Admin Portal</h3>
            <p className="text-muted-foreground text-center text-sm mb-6">Access super administrator controls and manage customers</p>
            <Link 
              href={`/${locale}/superadmin/organizations`}
              className="block w-full py-2 px-4 bg-muted hover:bg-muted/80 text-foreground text-center rounded-md"
            >
              Access Super Admin Portal
            </Link>
          </div>

          {/* Admin Portal */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground text-center mb-2">Admin Portal</h3>
            <p className="text-muted-foreground text-center text-sm mb-6">Manage users and products for your organization</p>
            <Link 
              href={`/${locale}/admin`}
              className="block w-full py-2 px-4 bg-muted hover:bg-muted/80 text-foreground text-center rounded-md"
            >
              Access Admin Portal
            </Link>
          </div>

          {/* User Portal */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground text-center mb-2">User Portal</h3>
            <p className="text-muted-foreground text-center text-sm mb-6">Access AI assistants and platform features</p>
            <Link 
              href={`/${locale}/portal`}
              className="block w-full py-2 px-4 bg-muted hover:bg-muted/80 text-foreground text-center rounded-md"
            >
              Access User Portal
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 