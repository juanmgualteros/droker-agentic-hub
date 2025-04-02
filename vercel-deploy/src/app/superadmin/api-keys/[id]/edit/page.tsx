import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Organization } from "@/types/organization";
import type { ApiKey } from "@/types/api-key";

interface EditApiKeyPageProps {
  params: {
    id: string;
  };
}

export default async function EditApiKeyPage({ params }: EditApiKeyPageProps) {
  const [apiKey, organizations] = await Promise.all([
    prisma.apiKey.findUnique({
      where: { id: params.id },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }) as Promise<ApiKey>,
    prisma.organization.findMany({
      orderBy: {
        name: 'asc',
      },
    }) as Promise<Organization[]>,
  ]);

  if (!apiKey) {
    notFound();
  }

  async function updateApiKey(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const value = formData.get('value') as string;
    const organizationId = formData.get('organizationId') as string;

    if (!name || !type || !organizationId) {
      throw new Error('Name, type, and organization are required');
    }

    const data: any = {
      name,
      type,
      organizationId,
    };

    // Only update the value if a new one is provided
    if (value) {
      data.value = value;
    }

    await prisma.apiKey.update({
      where: { id: params.id },
      data,
    });

    revalidatePath('/superadmin/api-keys');
    redirect('/superadmin/api-keys');
  }

  async function deleteApiKey() {
    'use server';

    await prisma.apiKey.delete({
      where: { id: params.id },
    });

    revalidatePath('/superadmin/api-keys');
    redirect('/superadmin/api-keys');
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Edit API Key</h1>
          <p className="text-gray-600">Update or delete this API key</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <form action={updateApiKey} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue={apiKey.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              id="type"
              required
              defaultValue={apiKey.type}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select a type</option>
              <option value="OPENAI">OpenAI</option>
              <option value="SUPABASE">Supabase</option>
            </select>
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              API Key Value
            </label>
            <input
              type="password"
              name="value"
              id="value"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Leave blank to keep current value"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave blank to keep the current API key value
            </p>
          </div>

          <div>
            <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700">
              Organization
            </label>
            <select
              name="organizationId"
              id="organizationId"
              required
              defaultValue={apiKey.organizationId}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select an organization</option>
              {organizations.map((org: Organization) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <form action={deleteApiKey}>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete API Key
              </button>
            </form>
            
            <div className="flex space-x-3">
              <Link
                href="/superadmin/api-keys"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update API Key
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 