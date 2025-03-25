import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// This is a mock database. In a real application, you would use a proper database.
let organizations = [
  {
    id: "1",
    name: "Acme Corp",
    state: "ACTIVE",
    createdAt: "2024-01-01",
    products: [],
    apiKeys: [],
  },
  {
    id: "2",
    name: "Globex Corp",
    state: "ACTIVE",
    createdAt: "2024-01-02",
    products: [],
    apiKeys: [],
  },
];

export async function GET() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  const userRole = cookieStore.get('userRole')?.value;

  if (!isAuthenticated || userRole !== 'superadmin') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const organizations = await prisma.organization.findMany({
      include: {
        subscription: true,
        users: true,
      },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return new Response('Error fetching organizations', { status: 500 });
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
    const organization = await prisma.organization.create({
      data: {
        id: uuidv4(),
        name: data.name,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Error creating organization:', error);
    return new Response('Error creating organization', { status: 500 });
  }
} 