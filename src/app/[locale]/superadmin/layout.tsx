import { headers } from "next/headers";
import { SuperAdminLayoutClient } from "@/components/superadmin/layout-client";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname === "/superadmin/login";

  // If on login page, don't render anything
  if (isLoginPage) {
    return null;
  }

  // For all other superadmin pages, use the superadmin layout
  return <SuperAdminLayoutClient title="Super Admin Portal">{children}</SuperAdminLayoutClient>;
} 