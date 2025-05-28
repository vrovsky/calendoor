"use server";

import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";
import { eventFormSchema } from "@/schema/events";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createEvent(
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<void> {
  try {
    const { userId } = await auth();
    console.log(userId);

    const { success, data } = eventFormSchema.safeParse(unsafeData);

    if (!success || !userId) {
      throw new Error("Invalid event data or user not authenticated.");
    }

    await db.insert(EventTable).values({
      ...data,

      clerkUserId: userId,
      updatedAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(`Failed to create event: ${error.message || error}`);
  } finally {
    revalidatePath("/events");
  }
}

export async function updateEvent(
  id: string,
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<void> {
  try {
    const { userId } = await auth();
    const { success, data } = eventFormSchema.safeParse(unsafeData);
    if (!success || !userId) {
      throw new Error("Invalid event data or user not authenticated.");
    }

    const { rowCount } = await db
      .update(EventTable)
      .set({ ...data })
      .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)));

    if (rowCount === 0) {
      throw new Error(
        "Event not found or user not authorized to update this event."
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to update event: ${error.message || error}`);
  } finally {
    revalidatePath("/events");
    redirect("/events");
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const { rowCount } = await db
      .delete(EventTable)
      .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)));

    if (rowCount === 0) {
      throw new Error(
        "Event not found or user not authorized to delete this event."
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to delete event: ${error.message || error}`);
  } finally {
    revalidatePath("/events");
  }
}

type EventRow = typeof EventTable.$inferSelect;
