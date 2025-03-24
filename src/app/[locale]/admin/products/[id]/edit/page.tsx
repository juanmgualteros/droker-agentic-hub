import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { userId } = auth();

  // Get the admin's organization
  const user = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
    include: {
      organization: true,
    },
  });

  if (!user?.organization) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold text-gray-900">No Organization Found</h1>
        <p className="mt-2 text-gray-500">Please contact support to set up your organization.</p>
      </div>
    );
  }

  // Get the product details
  const product = await prisma.product.findFirst({
    where: {
      id: params.id,
      organizationId: user.organization.id,
    },
  });

  if (!product) {
    notFound();
  }

  async function updateProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    if (!name || !price) {
      throw new Error("Name and price are required");
    }

    await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        price,
      },
    });

    revalidatePath(`/admin/products/${params.id}`);
    redirect(`/admin/products/${params.id}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update product details for {product.name}.
        </p>
      </div>

      <form action={updateProduct} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue={product.name}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              name="description"
              id="description"
              rows={3}
              defaultValue={product.description || ""}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product description"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              required
              min="0"
              step="0.01"
              defaultValue={product.price}
              className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <a
            href={`/admin/products/${params.id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
} 