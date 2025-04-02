import ProductForm from '@/components/superadmin/products/ProductForm';

export default function NewProductPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black">Create New Product</h1>
        <p className="text-gray-600">Add a new product to your platform</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
} 