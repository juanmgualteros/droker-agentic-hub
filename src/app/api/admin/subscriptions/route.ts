import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { SubStatus, SubscriptionType } from "@prisma/client";

const createSubscriptionSchema = z.object({
  type: z.nativeEnum(SubscriptionType),
  organizationId: z.string(),
  endDate: z.string().datetime().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = createSubscriptionSchema.parse(json);

    const subscription = await prisma.subscription.create({
      data: {
        id: `sub_${Date.now()}`,
        type: body.type,
        organizationId: body.organizationId,
        endDate: body.endDate ? new Date(body.endDate) : null,
        status: SubStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[SUBSCRIPTIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("[SUBSCRIPTIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get("subscriptionId");

    if (!subscriptionId) {
      return new NextResponse("Subscription ID required", { status: 400 });
    }

    const json = await req.json();
    const body = z.object({
      type: z.nativeEnum(SubscriptionType).optional(),
      endDate: z.string().datetime().optional(),
      status: z.nativeEnum(SubStatus).optional(),
    }).parse(json);

    const subscription = await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        ...(body.type && { type: body.type }),
        ...(body.endDate && { endDate: new Date(body.endDate) }),
        ...(body.status && { status: body.status }),
        updatedAt: new Date(),
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[SUBSCRIPTIONS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 