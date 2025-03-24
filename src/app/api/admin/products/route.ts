import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductCategory, ProductType } from "@prisma/client";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.nativeEnum(ProductCategory),
  type: z.nativeEnum(ProductType),
  organizationId: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = createProductSchema.parse(json);

    // Verify the requesting user is an admin of the organization
    const admin = await prisma.user.findFirst({
      where: {
        clerkId: userId,
        role: "ADMIN",
        organizationId: body.organizationId,
      },
    });

    if (!admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create the product
    const product = await prisma.product.create({
      data: {
        id: `prod_${Date.now()}`,
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        type: body.type,
        organizationId: body.organizationId,
        updatedAt: new Date(),
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        organization: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 