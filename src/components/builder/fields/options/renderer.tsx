import { Controller } from "react-hook-form";
import type { RendererProps } from "../registry";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function OptionsFieldRenderer({
  form,
  formField,
}: RendererProps) {
  if (formField.type !== "options") return null;

  return (
    <Controller
      key={formField.id}
      name={formField.id}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{formField.label}</FieldLabel>

          {formField.description && (
            <FieldDescription>{formField.description}</FieldDescription>
          )}

          {formField.multipleAnswers ? (
            <div className="mt-2 space-y-2">
              {formField.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm"
                  htmlFor={`renderer-${formField.id}-${option.value}`}
                >
                  <Checkbox
                    id={`renderer-${formField.id}-${option.value}`}
                    checked={
                      Array.isArray(field.value) &&
                      field.value.includes(option.value)
                    }
                    onCheckedChange={(checked) => {
                      const selected = Array.isArray(field.value)
                        ? field.value
                        : [];
                      field.onChange(
                        checked
                          ? [...selected, option.value]
                          : selected.filter((value) => value !== option.value)
                      );
                    }}
                  />
                  <span>{option.value}</span>
                </label>
              ))}
            </div>
          ) : (
            <RadioGroup
              id={`renderer-${formField.id}`}
              value={String(field.value ?? "")}
              onValueChange={field.onChange}
              className="mt-2 flex flex-col space-y-1"
            >
              {formField.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm"
                  htmlFor={`renderer-${formField.id}-${option.value}`}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`renderer-${formField.id}-${option.value}`}
                  />
                  <span>{option.value}</span>
                </label>
              ))}
            </RadioGroup>
          )}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
