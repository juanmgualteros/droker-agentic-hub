import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, email, password } = await req.json();

    // Validate organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: params.id },
    });

    if (!organization) {
      return new NextResponse('Organization not found', { status: 404 });
    }

    // Create user in Clerk
    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      firstName: name,
    });

    // Create user in our database with admin role
    const user = await prisma.user.create({
      data: {
        id: clerkUser.id,
        name,
        email,
        role: 'ADMIN',
        organizationId: params.id,
        clerkId: clerkUser.id,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[ORGANIZATIONS_ADMIN_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 