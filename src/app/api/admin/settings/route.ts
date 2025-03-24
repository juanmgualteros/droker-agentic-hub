import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSettingsSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  userId: z.string(),
});

export async function PATCH(req: Request) {
  try {
    const json = await req.json();
    const body = updateSettingsSchema.parse(json);

    const user = await prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        name: body.name,
        email: body.email,
        updatedAt: new Date(),
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[SETTINGS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 