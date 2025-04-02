import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/superadmin/products/ProductForm';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black">Edit Product</h1>
        <p className="text-gray-600">Update product details</p>
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  );
} 