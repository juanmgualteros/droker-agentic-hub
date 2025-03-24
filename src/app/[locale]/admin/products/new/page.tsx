import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateProductForm } from "@/components/admin/create-product-form";

export default async function NewProductPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId,
      role: "ADMIN",
    },
  });

  if (!user?.organizationId) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold text-gray-900">No Organization Found</h1>
        <p className="mt-2 text-gray-500">Please contact support to set up your organization.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-black">Add New Product</h1>
        <p className="text-gray-600">Create a new product for your organization</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Fill in the details for your new product. You can edit these details later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateProductForm organizationId={user.organizationId} />
        </CardContent>
      </Card>
    </div>
  );
} 