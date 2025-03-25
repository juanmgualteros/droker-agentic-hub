import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { randomUUID } from 'crypto';

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
    const organizations = await prisma.organization.findMany({
      include: {
        products: true,
        apiKeys: true,
      },
    });
    return NextResponse.json(organizations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create organization in database
    const organization = await prisma.organization.create({
      data: {
        id: randomUUID(),
        name: body.name,
        updatedAt: new Date(),
        products: {
          create: body.products || [],
        },
        apiKeys: {
          create: body.apiKeys || [],
        },
      },
      include: {
        products: true,
        apiKeys: true,
      },
    });

    // Create admin user in Clerk
    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [body.adminUser.email],
      password: body.adminUser.password,
      firstName: body.adminUser.name.split(' ')[0],
      lastName: body.adminUser.name.split(' ').slice(1).join(' ') || '',
    });

    // Create user record in database
    await prisma.user.create({
      data: {
        id: randomUUID(),
        name: body.adminUser.name,
        email: body.adminUser.email,
        role: UserRole.ADMIN,
        organizationId: organization.id,
        updatedAt: new Date(),
        clerkId: clerkUser.id,
      },
    });

    return NextResponse.json(organization, { status: 201 });
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
} 