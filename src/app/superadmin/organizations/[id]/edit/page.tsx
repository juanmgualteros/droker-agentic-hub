import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface PrismaError {
  code: string;
  message: string;
}

function isPrismaError(error: unknown): error is PrismaError {
  return typeof error === 'object' && error !== null && 'code' in error;
}

interface EditOrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function EditOrganizationPage({
  params,
}: EditOrganizationPageProps) {
  const organization = await prisma.organization.findUnique({
    where: { id: params.id },
    include: {
      subscription: true,
    },
  });

  if (!organization) {
    notFound();
  }

  async function updateOrganization(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const subscriptionType = formData.get("subscriptionType") as string;
    const subscriptionStatus = formData.get("subscriptionStatus") as string;

    if (!name) {
      throw new Error("Name is required");
    }

    try {
      await prisma.organization.update({
        where: { id: params.id },
        data: {
          name,
          subscription: {
            update: {
              type: subscriptionType as "FREE" | "BASIC" | "PRO" | "ENTERPRISE",
              status: subscriptionStatus as "ACTIVE" | "INACTIVE" | "CANCELLED" | "EXPIRED",
            },
          },
        },
      });

      revalidatePath(`/superadmin/organizations/${params.id}`);
      redirect(`/superadmin/organizations/${params.id}`);
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2002') {
        throw new Error("An organization with this name already exists");
      }
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update organization details and subscription information.
        </p>
      </div>

      <form action={updateOrganization} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Organization Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue={organization.name}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subscriptionType"
            className="block text-sm font-medium text-gray-700"
          >
            Subscription Type
          </label>
          <select
            id="subscriptionType"
            name="subscriptionType"
            required
            defaultValue={organization.subscription?.type || "FREE"}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="FREE">Free</option>
            <option value="BASIC">Basic</option>
            <option value="PRO">Pro</option>
            <option value="ENTERPRISE">Enterprise</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="subscriptionStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Subscription Status
          </label>
          <select
            id="subscriptionStatus"
            name="subscriptionStatus"
            required
            defaultValue={organization.subscription?.status || "INACTIVE"}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <a
            href={`/superadmin/organizations/${params.id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Organization
          </button>
        </div>
      </form>
    </div>
  );
} 