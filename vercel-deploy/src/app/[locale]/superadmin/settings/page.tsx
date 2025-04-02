'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between p-6 bg-card rounded-lg border border-border">
          <div>
            <h4 className="text-sm font-medium text-foreground">Branding Settings</h4>
            <p className="text-sm text-muted-foreground">
              Customize your company logo and branding
            </p>
          </div>
          <Link href={`/${locale}/superadmin/settings/branding`}>
            <Button>Configure</Button>
          </Link>
        </div>

        <div className="flex items-center justify-between p-6 bg-card rounded-lg border border-border">
          <div>
            <h4 className="text-sm font-medium text-foreground">Maintenance Mode</h4>
            <p className="text-sm text-muted-foreground">
              Enable maintenance mode to prevent user access during updates
            </p>
          </div>
          <Button>Enable</Button>
        </div>

        <div className="flex items-center justify-between p-6 bg-card rounded-lg border border-border">
          <div>
            <h4 className="text-sm font-medium text-foreground">System Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Configure system-wide notification preferences
            </p>
          </div>
          <Button>Configure</Button>
        </div>
      </div>
    </div>
  );
} 