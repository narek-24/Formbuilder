import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { type FormProps } from "../registry";
import { type z } from "zod";
import { Input } from "@/components/ui/input";
import { useFieldsForm } from "../../hooks/use-fields-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { headingFieldSchema } from "../../schemas/layout-schemas";

const headingFormSchema = headingFieldSchema.omit({
  id: true,
  type: true,
  isSaved: true,
  category: true,
});

type HeadingFormSchemaType = z.infer<typeof headingFormSchema>;

export default function HeadingFieldForm({ field, setToDefault }: FormProps) {
  if (field.type !== "heading")
    throw Error("Need to pass in a heading field to heading form");

  const form = useForm({
    resolver: zodResolver(headingFormSchema),
    defaultValues: {
      text: field.text,
    },
  });

  const { onSubmit, firstInputRef } = useFieldsForm<HeadingFormSchemaType>(
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
        name="text"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="text">Text*</FieldLabel>
            <Input
              id="text"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="What is your name?"
              ref={firstInputRef}
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
