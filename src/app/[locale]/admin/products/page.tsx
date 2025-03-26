import { ProductsList } from "@/components/admin/products/products-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and configure your organization's products
          </p>
        </div>
        <Link href="/admin/products/request">
          <Button className="text-white bg-black hover:bg-gray-800">
            Request new product
          </Button>
        </Link>
      </div>
      <ProductsList />
    </div>
  );
} 