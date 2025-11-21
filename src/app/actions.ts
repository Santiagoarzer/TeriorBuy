"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSpace(formData: FormData) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const imageUrl = formData.get("imageUrl") as string;

    if (!title || !imageUrl) {
        throw new Error("Missing required fields");
    }

    // Ensure user exists in our DB (sync with Clerk if needed)
    // For this demo, we assume the user might not exist if they just signed up via Clerk
    // so we upsert them.
    // Note: In a real app, you'd use Webhooks to sync Clerk users.
    const user = await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
            id: userId,
            email: "user@example.com", // We don't have email here easily without Clerk SDK call, using placeholder or skipping
            role: "DESIGNER", // Default to designer for uploaders
        },
    });

    const space = await prisma.space.create({
        data: {
            title,
            description,
            location,
            imageUrl,
            ownerId: user.id,
            type: "Residential", // Default
        },
    });

    revalidatePath("/explore");
    redirect(`/spaces/${space.id}`);
}
