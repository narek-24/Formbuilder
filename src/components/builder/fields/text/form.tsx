import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { textFieldSchema } from "../../schemas/input-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type FormProps } from "../registry";
import { type z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFieldsForm } from "../../hooks/use-fields-form";

const textFormSchema = textFieldSchema.omit({
  id: true,
  type: true,
  isSaved: true,
  category: true,
});

type TextFormSchemaType = z.infer<typeof textFormSchema>;

export default function TextFieldForm({ field, setToDefault }: FormProps) {
  if (field.type !== "text")
    throw Error("Need to pass in a text field to text form");

  const form = useForm({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      label: field.label,
      isRequired: field.isRequired,
      longAnswer: field.longAnswer,
      placeholder: field.placeholder,
      description: field.description,
    },
  });

  const { onSubmit, firstInputRef } = useFieldsForm<TextFormSchemaType>(
    field,
    setToDefault
  );

  return (
    <form
      autoComplete="off"
      className="grid gap-5"
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
              placeholder="What is your name?"
              ref={firstInputRef}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="placeholder"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="placeholder">Placeholder</FieldLabel>
            <Input
              id="placeholder"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Your answer"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex flex-wrap gap-8">
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
          name="longAnswer"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="w-fit" data-invalid={fieldState.invalid}>
              <div className="flex">
                <Checkbox
                  id="longAnswer"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel className="pl-2" htmlFor="longAnswer">
                  Long answer
                </FieldLabel>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

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

      <div className="flex gap-2">
        <Button className="w-fit" type="submit">
          Save
        </Button>
        {field.isSaved && (
          <Button type="button" className="w-fit" variant="secondary">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
