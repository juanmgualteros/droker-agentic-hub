import { ProductConfiguration } from "@/components/admin/products/product-configuration";

interface ProductConfigurePageProps {
  params: {
    id: string;
  };
}

export default function ProductConfigurePage({ params }: ProductConfigurePageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Configure Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Customize the product's features and settings
        </p>
      </div>
      <ProductConfiguration productId={params.id} />
    </div>
  );
} 