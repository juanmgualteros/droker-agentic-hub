import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export default function NewOrganizationPage() {
  async function createOrganization(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const state = formData.get("state") as string;
    const subscriptionType = formData.get("subscriptionType") as string;

    if (!name) {
      throw new Error("Name is required");
    }

    try {
      const organization = await prisma.organization.create({
        data: {
          name,
          state: state as 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED',
          subscription: {
            create: {
              type: subscriptionType as "NONE" | "FREE" | "BASIC" | "PRO" | "ENTERPRISE",
              status: "ACTIVE",
            },
          },
        },
      });

      revalidatePath("/superadmin/organizations");
      redirect("/superadmin/organizations");
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        throw new Error("An organization with this name already exists");
      }
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">New Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new organization and set up their subscription.
        </p>
      </div>

      <form action={createOrganization} className="space-y-6">
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
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter organization name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            required
            defaultValue="ACTIVE"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="NONE">None</option>
            <option value="FREE">Free</option>
            <option value="BASIC">Basic</option>
            <option value="PRO">Pro</option>
            <option value="ENTERPRISE">Enterprise</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <a
            href="/superadmin/organizations"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Organization
          </button>
        </div>
      </form>
    </div>
  );
} 