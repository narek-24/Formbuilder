import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { numberFieldSchema } from "../../schemas/input-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type FormProps } from "../registry";
import { type z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFieldsForm } from "../../hooks/use-fields-form";

const numberFormSchema = numberFieldSchema.omit({
  id: true,
  type: true,
  isSaved: true,
  category: true,
});

type NumberFormSchemaType = z.infer<typeof numberFormSchema>;

export default function NumberFieldForm({ field, setToDefault }: FormProps) {
  if (field.type !== "number")
    throw Error("Need to pass in a number field to number form");

  const form = useForm<NumberFormSchemaType>({
    // @ts-expect-error cba
    resolver: zodResolver(numberFormSchema),
    defaultValues: {
      label: field.label,
      isRequired: field.isRequired,
      description: field.description,
      min: field.min,
      max: field.max,
    },
  });

  const { onSubmit, firstInputRef } = useFieldsForm<NumberFormSchemaType>(
    field,
    setToDefault
  );

  return (
    <form
      autoComplete="off"
      className="grid gap-5"
      // @ts-expect-error cba
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="label"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="label">Label*</FieldLabel>
            <Input
              id="label"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="How old are you?"
              ref={firstInputRef}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="isRequired"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="w-fit" data-invalid={fieldState.invalid}>
            <div className="flex">
              <Checkbox
                id="isRequired"
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel className="pl-2" htmlFor="isRequired">
                Is required
              </FieldLabel>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="More info..."
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex gap-4">
        <Controller
          name="min"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="label">Minimum value</FieldLabel>
              <Input
                id="min"
                type="number"
                placeholder="0"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="max"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="label">Maximum value</FieldLabel>
              <Input
                id="max"
                type="number"
                placeholder="100"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex gap-2">
        <Button className="w-fit" type="submit">
          Save
        </Button>
        {field.isSaved && (
          <Button
            type="button"
            className="w-fit"
            variant="secondary"
            onClick={setToDefault}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
