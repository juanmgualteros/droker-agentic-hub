import { ProductsList } from "@/components/admin/products/products-list";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and configure your organization's products
        </p>
      </div>
      <ProductsList />
    </div>
  );
} 