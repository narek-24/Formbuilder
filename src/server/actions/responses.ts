"use server";

import z from "zod";
import { actionClient, ActionError } from "./action-client";
import { forms, responses } from "../db/schema";
import { eq } from "drizzle-orm";
import { formSchema } from "@/components/builder/schemas/form-schemas";
import { createValidationSchema } from "@/components/builder/renderer/create-validation";

const respondToFormSchema = z.object({
  formId: z.number(),
  answers: z.string(),
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

    const parsedForm = formSchema.safeParse(form.content);
    if (!parsedForm.success) {
      throw new ActionError("Form content is invalid.");
    }

    let answers: unknown;
    try {
      answers = JSON.parse(parsedInput.answers);
    } catch (_) {
      throw new ActionError("Invalid answers payload.");
    }

    const { schema } = createValidationSchema(parsedForm.data);
    const validation = schema.safeParse(answers);
    if (!validation.success) {
      throw new ActionError("Submitted answers are invalid.");
    }

    await ctx.db.insert(responses).values({
      formId: parsedInput.formId,
      answers: validation.data,
    });
  });
