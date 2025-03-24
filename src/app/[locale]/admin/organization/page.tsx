import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/shared/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OrganizationPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
    include: {
      organization: {
        include: {
          subscription: true,
        },
      },
    },
  });

  if (!user?.organization) {
    return (
      <PageLayout
        title="No Organization Found"
        description="Please contact support to get your organization set up"
      >
        <div className="text-center">
          <p className="text-gray-600">
            You don't have an organization assigned to your account.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Organization Settings"
      description="Manage your organization details and subscription"
      className="space-y-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Name</h3>
              <p className="text-gray-600">{user.organization.name}</p>
            </div>
            <div>
              <h3 className="font-medium">Created</h3>
              <p className="text-gray-600">
                {new Date(user.organization.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/organization/edit">
                <Button>Edit Organization</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Current Plan</h3>
              <p className="text-gray-600">
                {user.organization.subscription?.type || "FREE"}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <p className="text-gray-600">
                {user.organization.subscription?.status || "INACTIVE"}
              </p>
            </div>
            <div className="pt-4">
              <Link href="/admin/organization/subscription">
                <Button variant="outline">Manage Subscription</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
} 