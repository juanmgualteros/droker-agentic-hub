import { headers } from "next/headers";
import AdminLayout from "@/components/admin/AdminLayout";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <AdminLayout title="Admin Portal">{children}</AdminLayout>;
}