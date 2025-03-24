import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure system-wide settings and preferences
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-light text-gray-900">System Configuration</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Basic system settings and configurations
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                    <p className="text-sm text-gray-500">
                      Enable maintenance mode to prevent user access during updates
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">System Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Configure system-wide notification preferences
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Backup Settings</h4>
                    <p className="text-sm text-gray-500">
                      Configure automatic backup schedule and retention
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 