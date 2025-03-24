import { PrismaClient } from '@prisma/client';
import ProductsClient from '@/components/superadmin/products/ProductsClient';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function ProductsPage() {
  try {
    const products = await prisma.product.findMany({
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return (
      <div className="p-6">
        <ProductsClient products={products} />
      </div>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 font-medium">Error loading products</h2>
          <p className="text-red-600 mt-1">Please try again later.</p>
          <p className="text-red-600 mt-2 text-sm">Error details: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  } finally {
    await prisma.$disconnect();
  }
} 