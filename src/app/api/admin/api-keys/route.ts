import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from "crypto";
import { ApiKeyType } from "@prisma/client";

const createApiKeySchema = z.object({
  name: z.string().min(2),
  organizationId: z.string(),
  type: z.nativeEnum(ApiKeyType),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = createApiKeySchema.parse(json);

    const apiKey = await prisma.apiKey.create({
      data: {
        id: `key_${Date.now()}`,
        name: body.name,
        value: `sk_${crypto.randomBytes(32).toString("hex")}`,
        type: body.type,
        organizationId: body.organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(apiKey);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[API_KEYS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error("[API_KEYS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const apiKeyId = searchParams.get("apiKeyId");

    if (!apiKeyId) {
      return new NextResponse("API Key ID required", { status: 400 });
    }

    await prisma.apiKey.delete({
      where: {
        id: apiKeyId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[API_KEYS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 