import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';

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
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const organizations = await prisma.organization.findMany({
      include: {
        users: true,
      },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const userRole = cookieStore.get('userRole');

    if (!token || userRole?.value !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const organization = await prisma.organization.create({
      data: {
        id: randomUUID(),
        name,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 