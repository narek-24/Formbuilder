"use server";

import z from "zod";
import { protectedActionClient } from "./action-client";
import { forms } from "../db/schema";

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
  });
