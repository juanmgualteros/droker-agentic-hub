"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/nextjs";

interface Organization {
  id: string;
  name: string;
  state: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  subscription_id: string;
  created_at: string;
  apiKeys: any[];
  users: any[];
}

export default function EditOrganizationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);

  // Get locale from pathname
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push(`/${locale}/sign-in`);
      return;
    }

    async function fetchOrganization() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/organizations/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch organization');
        }
        const data = await response.json();
        setOrganization(data);
      } catch (error) {
        console.error('Error fetching organization:', error);
        setError(error instanceof Error ? error.message : 'Failed to load organization');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrganization();
  }, [params.id, isLoaded, isSignedIn, router, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;

    try {
      setError(null);
      const response = await fetch(`/api/organizations/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organization),
      });

      if (!response.ok) {
        throw new Error('Failed to update organization');
      }

      router.push(`/${locale}/superadmin/organizations`);
    } catch (error) {
      console.error('Error updating organization:', error);
      setError(error instanceof Error ? error.message : 'Failed to update organization');
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={() => router.push(`/${locale}/superadmin/organizations`)}>
          Back to Organizations
        </Button>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 mb-4">Organization not found</div>
        <Button onClick={() => router.push(`/${locale}/superadmin/organizations`)}>
          Back to Organizations
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900">Edit Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Edit organization details and manage its resources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={organization.name}
                onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                placeholder="Enter organization name"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/superadmin/organizations`)}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
} 