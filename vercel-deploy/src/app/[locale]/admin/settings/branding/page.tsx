'use client';

import { useState, useEffect } from 'react';
import { LogoUpload } from '@/components/ui/logo-upload';

export default function BrandingPage() {
  const [customerLogo, setCustomerLogo] = useState<string>();

  useEffect(() => {
    const storedLogo = localStorage.getItem('customerLogo');
    if (storedLogo) setCustomerLogo(storedLogo);
  }, []);

  const handleLogoUpload = async (file: File) => {
    try {
      // Here you would typically upload to your storage service
      // For now, we'll use localStorage with base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('customerLogo', base64String);
        setCustomerLogo(base64String);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to upload logo:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Organization Branding</h1>
        <p className="mt-1 text-sm text-gray-500">
          Customize your organization's appearance
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <LogoUpload
          currentLogo={customerLogo}
          onUpload={handleLogoUpload}
          label="Organization Logo"
        />
      </div>
    </div>
  );
} 