import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  // Get the headers
  const headersList = headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = first_name && last_name ? `${first_name} ${last_name}` : null;

    if (!email) {
      return new Response("No email address found", {
        status: 400,
      });
    }

    try {
      await prisma.user.create({
        data: {
          email,
          name,
          clerkId: id,
          role: "USER", // Default role
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", {
        status: 500,
      });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = first_name && last_name ? `${first_name} ${last_name}` : null;

    if (!email) {
      return new Response("No email address found", {
        status: 400,
      });
    }

    try {
      await prisma.user.update({
        where: {
          clerkId: id,
        },
        data: {
          email,
          name,
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Error updating user", {
        status: 500,
      });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      await prisma.user.delete({
        where: {
          clerkId: id,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", {
        status: 500,
      });
    }
  }

  return new Response("Success", { status: 200 });
} 