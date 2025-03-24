import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  organizationId: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = createUserSchema.parse(json);

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

    // Create the user
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: body.name,
        email: body.email,
        role: body.role,
        organizationId: body.organizationId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[USERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 