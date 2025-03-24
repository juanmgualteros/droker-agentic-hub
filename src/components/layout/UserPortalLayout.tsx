'use client';

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserPortalLayoutProps {
  children: React.ReactNode;
}

export default function UserPortalLayout({ children }: UserPortalLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/portal/assistants", label: "AI Assistants" },
    { href: "/portal/conversations", label: "Conversations" },
    { href: "/portal/settings", label: "Settings" },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-black">User Portal</h1>
            </div>
            <div className="flex items-center gap-4">
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
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
} 