import { type InputField, isInputField } from "../schemas/input-schemas";
import { type FormSchemaField } from "../schemas/form-schemas";
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
import { useMemo, useState } from "react";
import { useBuilderStore } from "../hooks/use-builder-store";

interface Props {
  field: FormSchemaField;
  setToDefault: () => void;
}

export default function ConditionalForm({ field, setToDefault }: Props) {
  const [parentId, setParentId] = useState(field.followUps?.parentId ?? "");
  const [value, setValue] = useState(field.followUps?.valueToMatch ?? "");

  const fields = useBuilderStore((state) => state.fields);
  const editField = useBuilderStore((state) => state.editField);
  const selectedParent = fields.find((f) => f.id === parentId);

  const availableParentFields = useMemo(
    () =>
      fields.filter(
        (f): f is InputField =>
          f.isSaved &&
          f.id !== field.id &&
          f.category === "input" &&
          !createsCycle(f.id, field.id, fields)
      ),
    [fields, field.id]
  );

  function handleSave() {
    const hasFollowUp = !!parentId && !!value;

    const updatedField = {
      ...field,
      followUps: hasFollowUp
        ? {
            parentId: parentId,
            valueToMatch: value,
          }
        : undefined,
    };

    if (isInputField(updatedField) && hasFollowUp) {
      updatedField.isRequired = false;
    }

    editField(updatedField);
    setToDefault();
  }

  function handleReset() {
    editField({
      ...field,
      followUps: undefined,
    });

    setToDefault();
  }

  const hasAvailableFields = availableParentFields.length > 0;
  const isOptionsField = selectedParent?.type === "options";
  const canSave = !!parentId && !!value;

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="parent-field">Depends on field</Label>
        <Select
          value={parentId}
          itemToStringLabel={(value) => {
            const field = fields.find((f) => f.id === value)!;
            return getFieldLabel(field);
          }}
          onValueChange={(value) => setParentId(value ?? "")}
        >
          <SelectTrigger id="parent-field" className="w-full">
            <SelectValue placeholder="Select a field" />
          </SelectTrigger>
          <SelectContent>
            {hasAvailableFields ? (
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
        {isOptionsField ? (
          <RadioGroup value={value} onValueChange={(value) => setValue(value)}>
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleSave} disabled={!canSave}>
          Save
        </Button>
        <Button type="button" variant="secondary" onClick={setToDefault}>
          Cancel
        </Button>
        {field.followUps && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="ml-auto"
          >
            Remove condition
          </Button>
        )}
      </div>
    </form>
  );
}

function getFieldLabel(field: FormSchemaField) {
  if (isInputField(field)) return field.label || `${field.type} field`;
  return "Select a field";
}

function createsCycle(
  candidateId: string,
  targetId: string,
  fields: FormSchemaField[]
) {
  const visited = new Set<string>();

  // Walk the followUps chain starting from candidateId to see if we reach targetId
  let current = fields.find((f) => f.id === candidateId);
  while (current?.followUps?.parentId) {
    const nextId = current.followUps.parentId;
    if (nextId === targetId) return true;
    if (visited.has(nextId)) break;

    visited.add(nextId);
    current = fields.find((f) => f.id === nextId);
  }

  return false;
}
