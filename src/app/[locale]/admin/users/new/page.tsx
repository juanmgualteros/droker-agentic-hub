import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { CreateUserForm } from "@/components/admin/create-user-form";

export default async function NewUserPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId,
      role: "ADMIN",
    },
  });

  if (!user?.organizationId) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold text-gray-900">No Organization Found</h1>
        <p className="mt-2 text-gray-500">Please contact support to set up your organization.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-black">Add New User</h1>
        <p className="text-gray-600">Create a new user in your organization</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>
            Fill in the details for the new user. They will receive an email to set up their account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm organizationId={user.organizationId} />
        </CardContent>
      </Card>
    </div>
  );
} 