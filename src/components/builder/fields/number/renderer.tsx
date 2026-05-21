import { Controller } from "react-hook-form";
import type { RendererProps } from "../registry";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function NumberFieldRenderer({
  formField,
  form,
}: RendererProps) {
  if (formField.type !== "number") return null;

  return (
    <Controller
      key={formField.id}
      name={formField.id}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{formField.label}</FieldLabel>

          {formField.description && (
            <FieldDescription>{formField.description}</FieldDescription>
          )}

          <Input
            {...field}
            id={formField.id}
            aria-invalid={fieldState.invalid}
            key={formField.id}
            placeholder={
              formField.min ? `Min: ${formField.min}` : "Enter a number"
            }
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
