import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || !['admin', 'superadmin'].includes(userRole || '')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const admins = await prisma.user.findMany({
      where: {
        organizationId: params.id,
        role: 'ADMIN',
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    return new Response('Error fetching admins', { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || !['admin', 'superadmin'].includes(userRole || '')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: data.email,
        name: data.name,
        role: 'ADMIN',
        organizationId: params.id,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating admin:', error);
    return new Response('Error creating admin', { status: 500 });
  }
} 