import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const { userId: currentUserId } = auth();
    if (!currentUserId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the user exists and belongs to the organization
    const user = await prisma.user.findFirst({
      where: {
        id: params.userId,
        organizationId: params.id,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Delete user from Clerk if they have a clerkId
    if (user.clerkId) {
      await clerkClient.users.deleteUser(user.clerkId);
    }

    // Delete user from our database
    await prisma.user.delete({
      where: {
        id: params.userId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[ORGANIZATIONS_USER_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 