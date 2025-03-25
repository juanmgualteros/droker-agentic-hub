'use client';

import { useState, useEffect } from 'react';
import { LogoUpload } from '@/components/ui/logo-upload';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function BrandingPage() {
  const [drokerLogo, setDrokerLogo] = useState<string>();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch('/api/settings/logo');
        if (response.ok) {
          const data = await response.json();
          setDrokerLogo(data.logoUrl);
        }
      } catch (error) {
        console.error('Failed to fetch logo:', error);
      }
    };
    fetchLogo();
  }, []);

  const handleLogoUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch('/api/settings/logo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload logo');
      }

      const data = await response.json();
      setDrokerLogo(data.logoUrl);
      toast.success('Logo updated successfully');
    } catch (error) {
      console.error('Failed to upload logo:', error);
      toast.error('Failed to upload logo');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900">Branding Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your company branding and appearance
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Company Logo</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload your company logo. This will be displayed in the header of all portals.
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-4">
              {drokerLogo && (
                <img
                  src={drokerLogo}
                  alt="Company Logo"
                  className="h-16 w-16 object-contain"
                />
              )}
              <Button
                onClick={() => document.getElementById('logo-upload')?.click()}
                className="text-white bg-black hover:bg-gray-800"
              >
                Upload New Logo
              </Button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(file);
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Recommended size: 256x256px. Supported formats: PNG, JPG, SVG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 