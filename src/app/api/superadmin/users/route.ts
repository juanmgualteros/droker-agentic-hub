import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || userRole !== 'superadmin') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        organization: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Error fetching users', { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || userRole !== 'superadmin') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const data = await request.json();

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: data.email,
        name: data.name,
        role: data.role,
        organizationId: data.organizationId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Error creating user', { status: 500 });
  }
} 