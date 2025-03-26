import { OrganizationTabs } from "@/components/organization/organization-tabs"

interface OrganizationLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default function OrganizationLayout({
  children,
  params
}: OrganizationLayoutProps) {
  return (
    <div className="space-y-6">
      <OrganizationTabs organizationId={params.id} />
      {children}
    </div>
  )
} 