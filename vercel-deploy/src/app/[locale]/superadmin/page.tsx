import { redirect } from "next/navigation";

export default function SuperAdminPage({ params }: { params: { locale: string } }) {
  // Redirect to organizations page by default
  redirect(`/${params.locale}/superadmin/organizations`);
} 