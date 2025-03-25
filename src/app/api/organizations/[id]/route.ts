import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: params.id },
      include: {
        products: true,
        apiKeys: true,
        users: true,
        subscription: true,
      },
    });

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.error('[ORGANIZATION_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const data = await request.json();

    const organization = await prisma.organization.update({
      where: { id: params.id },
      data: {
        name: data.name,
        updatedAt: new Date(),
      },
      include: {
        products: true,
        apiKeys: true,
        users: true,
        subscription: true,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error('[ORGANIZATION_PUT]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    // Delete related records first
    await prisma.$transaction([
      // Delete API keys
      prisma.apiKey.deleteMany({
        where: { organizationId: params.id }
      }),
      // Delete subscription
      prisma.subscription.deleteMany({
        where: { organizationId: params.id }
      }),
      // Delete products
      prisma.product.deleteMany({
        where: { organizationId: params.id }
      }),
      // Delete users
      prisma.user.deleteMany({
        where: { organizationId: params.id }
      }),
      // Finally delete the organization
      prisma.organization.delete({
        where: { id: params.id }
      })
    ]);

    return NextResponse.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error('[ORGANIZATION_DELETE]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 