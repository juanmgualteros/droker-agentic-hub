import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function EditProductPage({
  params
}: {
  params: { id: string; locale: string }
}) {
  // Check if user is authenticated and has admin role
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || !['admin', 'superadmin'].includes(userRole || '')) {
    redirect(`/${params.locale}/login`);
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    redirect(`/${params.locale}/admin/products`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-gray-900">Edit Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update product details
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
    </div>
  );
} 