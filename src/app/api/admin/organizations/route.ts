import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { SubscriptionType, SubStatus } from "@prisma/client";

const createOrganizationSchema = z.object({
  name: z.string().min(2),
  subscriptionType: z.nativeEnum(SubscriptionType).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = createOrganizationSchema.parse(json);

    const organization = await prisma.organization.create({
      data: {
        id: `org_${Date.now()}`,
        name: body.name,
        updatedAt: new Date(),
        ...(body.subscriptionType && {
          subscription: {
            create: {
              id: `sub_${Date.now()}`,
              type: body.subscriptionType,
              status: SubStatus.ACTIVE,
              updatedAt: new Date(),
            },
          },
        }),
      },
      include: {
        apiKeys: true,
        products: true,
        users: true,
        subscription: true,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[ORGANIZATIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        apiKeys: true,
        products: true,
        users: true,
        subscription: true,
      },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    console.error("[ORGANIZATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return new NextResponse("Organization ID required", { status: 400 });
    }

    const json = await req.json();
    const body = z.object({
      name: z.string().min(2).optional(),
    }).parse(json);

    const organization = await prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        ...(body.name && { name: body.name }),
        updatedAt: new Date(),
      },
      include: {
        apiKeys: true,
        products: true,
        users: true,
        subscription: true,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[ORGANIZATIONS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 