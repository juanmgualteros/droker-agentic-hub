"use client"

import { usePathname, useRouter } from "next/navigation"
import { Database, Key, Package, Settings, Users } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrganizationTabsProps {
  organizationId: string
}

export function OrganizationTabs({ organizationId }: OrganizationTabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      id: "details",
      label: "Details",
      icon: Database,
      href: `/admin/organizations/${organizationId}`
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: `/admin/organizations/${organizationId}/products`
    },
    {
      id: "api-keys",
      label: "API Keys",
      icon: Key,
      href: `/admin/organizations/${organizationId}/api-keys`
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      href: `/admin/organizations/${organizationId}/users`
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: `/admin/organizations/${organizationId}/settings`
    }
  ]

  const currentTab = tabs.find(tab => pathname === tab.href)?.id || "details"

  return (
    <Tabs value={currentTab} className="w-full">
      <TabsList className="w-full">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onClick={() => router.push(tab.href)}
              className="flex-1"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
} 