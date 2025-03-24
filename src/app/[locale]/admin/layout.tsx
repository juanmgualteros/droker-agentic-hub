import { headers } from "next/headers";
import { AdminLayoutClient } from "@/components/admin/layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname === "/admin/login";

  // If on login page, don't render anything
  if (isLoginPage) {
    return null;
  }

  // For all other admin pages, use the admin layout
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
} 