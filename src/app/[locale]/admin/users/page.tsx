import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { PageLayout } from "@/components/shared/page-layout";

export default async function UsersPage() {
  return (
    <PageLayout
      title="Users"
      description="Manage users in your organization"
      className="space-y-8"
    >
      <div className="flex justify-between">
        <div className="flex-1" />
        <Link href="/admin/users/new">
          <Button>Add New User</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Demo User</TableCell>
            <TableCell>demo@example.com</TableCell>
            <TableCell>USER</TableCell>
            <TableCell>Today</TableCell>
            <TableCell>
              <Link href="/admin/users/edit" className="text-blue-600 hover:text-blue-800">
                Edit
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PageLayout>
  );
} 