import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      include: {
        organization: true,
      },
    });
    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, value, type } = body;

    // Get the first organization
    const organization = await prisma.organization.findFirst();
    if (!organization) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 });
    }

    const apiKey = await prisma.apiKey.create({
      data: {
        id: uuidv4(),
        name,
        value,
        type,
        organizationId: organization.id,
        updatedAt: new Date()
      },
    });

    return NextResponse.json(apiKey);
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, value, type } = body;

    const apiKey = await prisma.apiKey.update({
      where: { id },
      data: {
        name,
        value,
        type,
        updatedAt: new Date()
      },
    });

    return NextResponse.json(apiKey);
  } catch (error) {
    console.error('Error updating API key:', error);
    return NextResponse.json({ error: 'Failed to update API key' }, { status: 500 });
  }
} 