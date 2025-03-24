import { PrismaClient, ProductType, ProductCategory } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface CreateProductData {
  name: string;
  type: ProductType;
  category: ProductCategory;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
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
    const data = await request.json() as CreateProductData;

    // For now, we'll use a default organization ID
    // In a real app, this should come from the authenticated user's context
    const defaultOrg = await prisma.organization.findFirst({
      where: {
        state: 'ACTIVE'
      }
    });

    if (!defaultOrg) {
      return NextResponse.json(
        { error: 'No active organization found' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        type: data.type,
        category: data.category,
        organizationId: defaultOrg.id,
        price: 0, // Default value since we removed it from the form
        description: '', // Default value since we removed it from the form
        updatedAt: new Date(),
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 