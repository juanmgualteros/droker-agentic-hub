'use client';

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Users, Building2, Package, Key } from "lucide-react";
import ClientLayout from "@/components/superadmin/ClientLayout";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      href: "/superadmin/organizations",
      label: "Organizations",
      icon: Building2,
    },
    {
      href: "/superadmin/users",
      label: "Admin Users",
      icon: Users,
    },
    {
      href: "/superadmin/products",
      label: "Products",
      icon: Package,
    },
    {
      href: "/superadmin/api-keys",
      label: "API Keys",
      icon: Key,
    },
  ];

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm">
          <div className="p-4">
            <Link href="/superadmin/organizations" className="text-xl font-bold block py-2">
              Super Admin
            </Link>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-gray-100 text-gray-900 border-l-2 border-black"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </ClientLayout>
  );
} 