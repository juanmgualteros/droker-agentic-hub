import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string; userId: string } }
) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || !['admin', 'superadmin'].includes(userRole || '')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
        organizationId: params.id,
      },
      include: {
        organization: true,
      },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Error fetching user', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; userId: string } }
) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || !['admin', 'superadmin'].includes(userRole || '')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: {
        id: params.userId,
        organizationId: params.id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response('Error deleting user', { status: 500 });
  }
} 