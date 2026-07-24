"use server";

import z from "zod";
import { actionClient, ActionError } from "./action-client";
import { forms, responses } from "../db/schema";
import { eq } from "drizzle-orm";

const respondToFormSchema = z.object({
  formId: z.number(),
  answers: z.json(),
});

export const respondToFormAction = actionClient
  .inputSchema(respondToFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const form = await ctx.db.query.forms.findFirst({
      where: eq(forms.id, parsedInput.formId),
    });

    if (!form) {
      throw new ActionError("Form not found.");
    }

    if (form.status === "cancelled") {
      throw new ActionError("This form is no longer accepting responses.");
    }

    await ctx.db.insert(responses).values({
      formId: parsedInput.formId,
      answers: parsedInput.answers,
    });
  });
