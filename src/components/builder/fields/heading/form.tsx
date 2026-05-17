import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { type FormProps } from "../registry";
import { type z } from "zod";
import { Input } from "@/components/ui/input";
import { useFieldsForm } from "../../hooks/use-fields-form";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  headingFieldSchema,
  SPACING_LEVELS,
} from "../../schemas/layout-schemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const headingFormSchema = headingFieldSchema.omit({
  id: true,
  type: true,
  isSaved: true,
  category: true,
});

type HeadingFormSchemaType = z.infer<typeof headingFormSchema>;

export default function HeadingFieldForm({ field }: FormProps) {
  if (field.type !== "heading")
    throw Error("Need to pass in a heading field to heading form");

  const form = useForm({
    resolver: zodResolver(headingFormSchema),
    defaultValues: {
      space: field.space,
      text: field.text,
    },
  });

  const { onSubmit, firstInputRef } = useFieldsForm<HeadingFormSchemaType>(
    field,
    () => {}
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

      <Controller
        name="space"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldSet>
            <FieldLegend variant="label">Spacing</FieldLegend>
            {/* <FieldDescription></FieldDescription> */}
            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              className="flex gap-8"
            >
              {SPACING_LEVELS.map((level) => (
                <Field key={level} data-invalid={fieldState.invalid}>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value={level}
                      id={`form-rhf-radiogroup-${level}`}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel
                      className="w-fit py-1 pl-3"
                      htmlFor={`form-rhf-radiogroup-${level}`}
                    >
                      {level}
                    </FieldLabel>
                  </div>
                </Field>
              ))}
            </RadioGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
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
