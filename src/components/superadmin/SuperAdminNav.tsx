'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperAdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { href: "/superadmin/organizations", label: "Organizations" },
    { href: "/superadmin/products", label: "Products" },
    { href: "/superadmin/api-keys", label: "API Keys" },
  ];

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-black">Super Admin Portal</h1>
          </div>

          <nav className="flex items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${
                  isActive(item.href)
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
} 