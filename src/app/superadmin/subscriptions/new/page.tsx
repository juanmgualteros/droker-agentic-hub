import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'

async function getOrganizations() {
  return prisma.organization.findMany({
    where: {
      subscription: null,
    },
    orderBy: {
      name: 'asc',
    },
  })
}

async function createSubscription(formData: FormData) {
  'use server'
  
  const organizationId = formData.get('organizationId') as string
  const plan = formData.get('plan') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  
  if (!organizationId || !plan || !startDate) {
    throw new Error('Required fields are missing')
  }
  
  await prisma.subscription.create({
    data: {
      organizationId,
      plan,
      status: 'ACTIVE',
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    },
  })
  
  redirect('/superadmin/subscriptions')
}

export default async function NewSubscriptionPage() {
  const organizations = await getOrganizations()

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">New Subscription</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create a new subscription for an organization.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <form action={createSubscription} className="space-y-6">
          <div>
            <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700">
              Organization
            </label>
            <div className="mt-1">
              <select
                id="organizationId"
                name="organizationId"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Select an organization</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
              Plan
            </label>
            <div className="mt-1">
              <select
                id="plan"
                name="plan"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Select a plan</option>
                <option value="FREE">Free</option>
                <option value="STARTER">Starter</option>
                <option value="PROFESSIONAL">Professional</option>
                <option value="ENTERPRISE">Enterprise</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="startDate"
                id="startDate"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date (Optional)
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <a
              href="/superadmin/subscriptions"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Create Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 