import { Controller, useFieldArray, useForm } from "react-hook-form";
import { optionsFieldSchema } from "../../schemas/input-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type FormProps } from "../registry";
import { type z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFieldsForm } from "../../hooks/use-fields-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Trash2 } from "lucide-react";

const optionsFormSchema = optionsFieldSchema.omit({
  id: true,
  type: true,
  isSaved: true,
  category: true,
});

type OptionsFormSchemaType = z.infer<typeof optionsFormSchema>;

export default function OptionsFieldForm({ field, setToDefault }: FormProps) {
  if (field.type !== "options")
    throw Error("Need to pass in a options field to options form");

  const form = useForm({
    resolver: zodResolver(optionsFormSchema),
    defaultValues: {
      label: field.label,
      isRequired: field.isRequired,
      description: field.description,
      multipleAnswers: field.multipleAnswers,
      options: field.options,
    },
  });

  const { onSubmit, firstInputRef } = useFieldsForm<OptionsFormSchemaType>(
    field,
    setToDefault
  );

  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });

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
          name="multipleAnswers"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="w-fit" data-invalid={fieldState.invalid}>
              <div className="flex">
                <Checkbox
                  id="multipleAnswers"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel className="pl-2" htmlFor="multipleAnswers">
                  Multiple answers
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

      <FieldSet className="gap-4">
        <FieldLegend variant="label">Options</FieldLegend>
        {/* <FieldDescription></FieldDescription> */}
        <FieldGroup className="gap-4">
          {options.map((option, index) => (
            <Controller
              key={option.id}
              name={`options.${index}`}
              control={form.control}
              render={({ field: controllerField, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <div className="flex gap-1">
                      <Input
                        aria-invalid={fieldState.invalid}
                        placeholder={`Option ${index + 1}`}
                        value={controllerField.value.value}
                        onChange={(e) =>
                          controllerField.onChange({
                            value: e.target.value ?? "",
                          })
                        }
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={`Remove option ${index}`}
                        onClick={() => remove(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          ))}

          <Button
            type="button"
            variant="secondary"
            className="w-fit"
            onClick={() => append({ value: "" })}
          >
            Add new option
          </Button>
        </FieldGroup>
      </FieldSet>

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
