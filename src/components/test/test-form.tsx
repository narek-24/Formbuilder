"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createValidationSchema } from "@/components/test/fields";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import type { FormSchema } from "../builder/schemas/form-schemas";

const fields: FormSchema = [
  {
    id: "efe",
    type: "text",
    longAnswer: false,
    label: "Your name",
    placeholder: "Your name",
    isRequired: false,
    category: "input",
    description: "",
    isSaved: false,
  },

  {
    id: "pmfwpem",
    placeholder: "More info...",
    type: "text",
    longAnswer: true,
    label: "More info",
    isRequired: true,
    category: "input",
    description: "",
    isSaved: false,
  },
];

export default function TestForm() {
  const { schema, defaultValues } = useMemo(
    () => createValidationSchema(fields),
    []
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(data: unknown) {
    console.log(data);
  }

  function handleReset() {
    form.reset();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="h-fit max-w-md space-y-8 rounded-3xl border-2 bg-card p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-primary-text">
        Test form
      </h2>

      {fields
        .filter((f) => f.category === "input")
        .map((formField) => (
          <Controller
            key={formField.id}
            name={formField.id}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{formField.label}</FieldLabel>

                <FieldDescription>
                  Provide a concise title for your bug report.
                </FieldDescription>

                {formField.type === "text" &&
                  (formField.longAnswer ? (
                    <Textarea
                      {...field}
                      id={formField.id}
                      aria-invalid={fieldState.invalid}
                      key={formField.id}
                      placeholder={formField.placeholder || "Your answer"}
                    />
                  ) : (
                    <Input
                      {...field}
                      id={formField.id}
                      aria-invalid={fieldState.invalid}
                      key={formField.id}
                      placeholder={formField.placeholder || "Your answer"}
                    />
                  ))}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}

      <div className="flex gap-2">
        <Button variant="secondary" type="button" onClick={handleReset}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
