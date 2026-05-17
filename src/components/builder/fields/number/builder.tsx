import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BuilderProps } from "../registry";

export default function BuilderNumberField({ field }: BuilderProps) {
  if (field.type !== "number") {
    return <></>;
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={field.id}>{field.label}</Label>

      {field.description && (
        <p className="mb-1 text-sm text-muted-foreground">
          {field.description}
        </p>
      )}

      <Input
        type="number"
        id={field.id}
        placeholder={field.min?.toString() || "0"}
      />
    </div>
  );
}
