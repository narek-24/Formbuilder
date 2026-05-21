import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useState } from "react";
import { useBuilderStore } from "../hooks/use-builder-store";
import { type FollowUpProps } from "../schemas/base-schema";
import { type FormSchemaField } from "../schemas/form-schemas";
import { isInputField, type InputField } from "../schemas/input-schemas";

export function ConditionalForm({
  field,
  onClose,
}: {
  field: FormSchemaField;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState<FollowUpProps>({
    parentId: field.followUps?.parentId ?? "",
    valueToMatch: field.followUps?.valueToMatch ?? "",
  });

  const fields = useBuilderStore((state) => state.fields);
  const editField = useBuilderStore((state) => state.editField);

  const selectedParent = fields.find(
    (f): f is InputField =>
      f.id === formState.parentId && f.category === "input"
  );

  function createsCycle(candidateId: string, targetId: string) {
    // Walk the followUps chain starting from candidateId to see if we reach targetId
    let current = fields.find((f) => f.id === candidateId);
    const visited = new Set<string>();
    while (current?.followUps?.parentId) {
      const nextId = current.followUps.parentId;
      if (nextId === targetId) return true;
      if (visited.has(nextId)) break;
      visited.add(nextId);
      current = fields.find((f) => f.id === nextId);
    }
    return false;
  }

  const availableParentFields = fields.filter((f): f is InputField => {
    if (f.id === field.id) return false;
    if (!f.isSaved) return false;
    if (f.category !== "input") return false;

    // prevent creating cycles (candidate should not depend on this field)
    if (createsCycle(f.id, field.id)) return false;
    return true;
  });

  const handleSave = useCallback(() => {
    const updatedField: FormSchemaField = {
      ...field,
      ...(isInputField(field)
        ? {
            isRequired:
              formState.parentId && formState.valueToMatch
                ? false
                : field.isRequired,
          }
        : {}),
      followUps:
        formState.parentId && formState.valueToMatch
          ? {
              parentId: formState.parentId,
              valueToMatch: formState.valueToMatch,
            }
          : undefined,
    };

    editField(updatedField);
    onClose();
  }, [field, formState, editField, onClose]);

  const handleReset = useCallback(() => {
    const updatedField: FormSchemaField = {
      ...field,
      followUps: undefined,
    };

    editField(updatedField);
    onClose();
  }, [field, editField, onClose]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="parent-field">Depends on field</Label>
        <Select
          value={formState.parentId}
          itemToStringLabel={(value) => {
            const field = fields.find((f) => f.id === value)!;
            return isInputField(field)
              ? field.label || `${field.type} field`
              : "Select a field";
          }}
          onValueChange={(value) =>
            setFormState((prev) => ({ ...prev, parentId: value ?? "" }))
          }
        >
          <SelectTrigger id="parent-field" className="w-full">
            <SelectValue placeholder="Select a field" />
          </SelectTrigger>
          <SelectContent>
            {availableParentFields.length > 0 ? (
              availableParentFields.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.label || `${f.type} field`}
                </SelectItem>
              ))
            ) : (
              <p className="p-2 text-xs text-muted-foreground">
                No fields to choose from
              </p>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="value-to-match">Value to match</Label>
        {selectedParent?.type === "options" ? (
          <RadioGroup
            value={String(formState.valueToMatch)}
            onValueChange={(value) =>
              setFormState((prev) => ({ ...prev, valueToMatch: value }))
            }
          >
            <div className="space-y-2">
              {selectedParent.options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <RadioGroupItem value={opt.value} />
                  <span>{opt.value}</span>
                </label>
              ))}
            </div>
          </RadioGroup>
        ) : (
          <Input
            id="value-to-match"
            placeholder="Enter value..."
            value={formState.valueToMatch}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                valueToMatch: e.target.value,
              }))
            }
          />
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          onClick={handleSave}
          disabled={!formState.parentId || !formState.valueToMatch}
        >
          Save
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        {field.followUps && (
          <Button variant="secondary" onClick={handleReset} className="ml-auto">
            Remove condition
          </Button>
        )}
      </div>
    </div>
  );
}
