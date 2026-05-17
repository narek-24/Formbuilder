import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BuilderProps } from "../registry";

export default function BuilderTextField({ field }: BuilderProps) {
  if (field.type !== "text") {
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

      {field.longAnswer ? (
        <Textarea
          id={field.id}
          placeholder={field.placeholder || "Your answer"}
        />
      ) : (
        <Input id={field.id} placeholder={field.placeholder || "Your answer"} />
      )}
    </div>
  );
}
