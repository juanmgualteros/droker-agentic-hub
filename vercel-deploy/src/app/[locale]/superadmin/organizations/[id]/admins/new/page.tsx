'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const adminSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type AdminFormData = z.infer<typeof adminSchema>;

export default function NewAdminPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
  });

  // Get locale from pathname
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  const onSubmit = async (data: AdminFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/organizations/${params.id}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create admin user');
      }

      toast.success('Admin user created successfully');
      router.push(`/${locale}/superadmin/organizations/${params.id}/users`);
      router.refresh();
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('Failed to create admin user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-comfortaa font-light mb-6">Create Admin User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-comfortaa font-light text-gray-700 mb-1">
              Name
            </label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-comfortaa font-light text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-comfortaa font-light text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={`w-full ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Admin'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 