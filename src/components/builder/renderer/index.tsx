"use client";

import type { FormSchema, FormSchemaField } from "../schemas/form-schemas";
import { createValidationSchema } from "./create-validation";
import { useEffect, useMemo } from "react";
import { fieldRegistry } from "../fields/registry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function FormRenderer({
  fields,
  onSubmit,
  isSubmitting = false,
  error,
}: {
  fields: FormSchema;
  onSubmit: (data: unknown) => void;
  isSubmitting?: boolean;
  error?: string;
}) {
  const { schema, defaultValues } = useMemo(
    () => createValidationSchema(fields),
    [fields]
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const watchedValues = form.watch();

  useEffect(() => {
    for (const field of fields) {
      if (!field.followUps) continue;

      const { parentId, valueToMatch } = field.followUps;
      const parentValue = watchedValues[parentId];
      const isConditionMet = parentValue === valueToMatch;

      // If the condition no longer matches and the field has a value, clear it
      if (!isConditionMet && form.getValues(field.id)) {
        form.resetField(field.id, { defaultValue: undefined });
      }
    }
  }, [watchedValues, form, fields]);

  if (fields.length === 0) {
    return null;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto grid h-fit max-w-lg gap-8"
    >
      {fields.map((formField) => {
        if (!isVisible(formField, watchedValues)) return null;

        const Comp = fieldRegistry.get(formField.type)?.Renderer;

        if (!Comp) return null;
        return <Comp key={formField.id} formField={formField} form={form} />;
      })}

      {error && (
        <Alert variant="danger">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <Button aria-disabled={isSubmitting} type="submit" className="w-fit">
        {isSubmitting && <Loader2 className="animate-spin" />} Submit
      </Button>
    </form>
  );
}

function isVisible(field: FormSchemaField, watched: Record<string, unknown>) {
  if (!field.followUps) return true;

  const parentValue = watched[field.followUps.parentId];
  const { valueToMatch } = field.followUps;

  if (Array.isArray(parentValue)) {
    return parentValue.includes(valueToMatch);
  }

  return parentValue === valueToMatch;
}
