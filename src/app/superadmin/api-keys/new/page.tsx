import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export const dynamic = 'force-dynamic';

export default async function NewApiKeyPage() {
  const organizations = await prisma.organization.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  if (organizations.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <p className="text-gray-600">You need to create an organization first before creating API keys.</p>
        <Link href="/superadmin/organizations/new" className="text-blue-600 hover:text-blue-800">
          Create Organization
        </Link>
      </div>
    );
  }

  async function createApiKey(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const value = formData.get('value') as string;
    const organizationId = formData.get('organizationId') as string;

    if (!name || !type || !value || !organizationId) {
      throw new Error('All fields are required');
    }
    await prisma.apiKey.create({
      data: {
        id: uuidv4(),
        name,
        type: type as 'OPENAI' | 'SUPABASE',
        value,
        organizationId,
        updatedAt: new Date(),
      },
    });

    revalidatePath('/superadmin/api-keys');
    redirect('/superadmin/api-keys');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">New API Key</h1>
        <p className="text-gray-600">Create a new API key for an organization</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <form action={createApiKey} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="E.g., OpenAI Production Key"
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
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="sk-..."
            />
          </div>

          <div>
            <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700">
              Organization
            </label>
            <select
              name="organizationId"
              id="organizationId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select an organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
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
              Create API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 