"use client";

import type { FormSchema, FormSchemaField } from "../schemas/form-schemas";
import { createValidationSchema } from "./create-validation";
import { useEffect, useMemo } from "react";
import { fieldRegistry } from "../fields/registry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function FormRenderer({
  fields,
  onSubmit,
}: {
  fields: FormSchema;
  onSubmit: (data: unknown) => void;
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
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid h-fit max-w-lg gap-8"
      >
        {fields.map((formField) => {
          if (!isVisible(formField, watchedValues)) return null;

          const Comp = fieldRegistry.get(formField.type).Renderer;
          return <Comp key={formField.id} formField={formField} form={form} />;
        })}

        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </div>
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
