import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organizationId: z.string().min(1),
  role: z.enum(["ADMIN"]),
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the user is a super admin
    const superAdmin = await prisma.user.findFirst({
      where: {
        clerkId: userId,
        role: "SUPERADMIN",
      },
    });

    if (!superAdmin) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const validatedData = createUserSchema.parse(body);

    // Check if organization exists
    const organization = await prisma.organization.findUnique({
      where: {
        id: validatedData.organizationId,
      },
    });

    if (!organization) {
      return new NextResponse("Organization not found", { status: 404 });
    }

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    // Create the admin user
    const newUser = await prisma.user.create({
      data: {
        id: `admin-${Date.now()}`, // Generate a unique ID
        name: validatedData.name,
        email: validatedData.email,
        role: validatedData.role,
        organizationId: validatedData.organizationId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("[SUPERADMIN_CREATE_USER]", error);
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 400 });
    }
    return new NextResponse("Internal error", { status: 500 });
  }
} 