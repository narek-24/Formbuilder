import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { BuilderProps } from "../registry";

export default function BuilderOptionsField({ field }: BuilderProps) {
  if (field.type !== "options") {
    return <></>;
  }

  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>

      {field.description && (
        <p className="text-sm text-muted-foreground">{field.description}</p>
      )}

      {field.multipleAnswers ? (
        <div className="space-y-2">
          {field.options.map((option) => (
            <div key={option.value} className="flex items-center gap-1">
              <Checkbox
                value={option.value}
                id={`builder-${field.id}-${option.value}`}
              />
              <Label
                htmlFor={`builder-${field.id}-${option.value}`}
                className="pl-2 font-normal capitalize"
              >
                {option.value}
              </Label>
            </div>
          ))}
        </div>
      ) : (
        <RadioGroup className="mt-2 flex flex-col space-y-1">
          {field.options.map((option) => (
            <div key={option.value} className="flex items-center gap-1">
              <RadioGroupItem
                value={option.value}
                id={`builder-${field.id}-${option.value}`}
              />
              <Label
                htmlFor={`builder-${field.id}-${option.value}`}
                className="pl-2 font-normal capitalize"
              >
                {option.value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
