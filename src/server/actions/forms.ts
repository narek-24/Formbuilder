"use server";

import z from "zod";
import { ActionError, protectedActionClient } from "./action-client";
import { revalidatePath } from "next/cache";
import { forms } from "../db/schema";
import { eq } from "drizzle-orm";

const createFromSchema = z.object({
  title: z.string(),
  content: z.string(),
  description: z.string().optional(),
});

export const createFormAction = protectedActionClient
  .inputSchema(createFromSchema)
  .action(async ({ parsedInput, ctx }) => {
    await ctx.db.insert(forms).values({
      userId: ctx.userId,
      title: parsedInput.title,
      content: parsedInput.content,
      description: parsedInput.description,
    });

    revalidatePath("/");
  });

// ***********************************

const deleteFormSchema = z.object({
  id: z.number(),
});

export const deleteFormAction = protectedActionClient
  .inputSchema(deleteFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const form = await ctx.db.query.forms.findFirst({
      where: eq(forms.id, parsedInput.id),
    });

    if (!form) {
      throw new ActionError("Form doesn't exist");
    }

    if (form.userId !== ctx.userId) {
      throw new ActionError("Your are not authorized do delete this form!");
    }

    await ctx.db.delete(forms).where(eq(forms.id, parsedInput.id));

    revalidatePath("/");
  });

// ***********************************

const cancelFormSchema = z.object({
  id: z.number(),
});

export const cancelFormAction = protectedActionClient
  .inputSchema(cancelFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const form = await ctx.db.query.forms.findFirst({
      where: eq(forms.id, parsedInput.id),
    });

    if (!form) {
      throw new ActionError("Form doesn't exist!");
    }

    if (form.status === "cancelled") {
      throw new ActionError("Form is already cancelled!");
    }

    if (form.userId !== ctx.userId) {
      throw new ActionError("You are not authorized to cancel this form!");
    }

    await ctx.db
      .update(forms)
      .set({ status: "cancelled" })
      .where(eq(forms.id, parsedInput.id));

    revalidatePath("/");
  });
