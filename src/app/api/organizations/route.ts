import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Helper function to transform Prisma data to the expected format
function transformOrganization(org: any) {
  return {
    id: org.id,
    name: org.name,
    state: org.state,
    subscription_id: org.subscriptionId || '',
    created_at: org.createdAt.toISOString(),
    apiKeys: org.apiKeys.map((key: any) => ({
      id: key.id,
      name: key.name,
      type: key.type,
      openai_key: key.value,
      created_at: key.createdAt.toISOString()
    }))
  };
}

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        apiKeys: true,
        products: true,
        users: true,
        subscription: true
      }
    });

    const organizations = orgs.map(transformOrganization);
    return NextResponse.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newOrg = await prisma.organization.create({
      data: {
        name: data.name,
        state: data.state || 'ACTIVE',
        updatedAt: new Date(),
      },
      include: {
        apiKeys: true,
        products: true,
        users: true,
        subscription: true
      }
    });

    return NextResponse.json(transformOrganization(newOrg));
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 