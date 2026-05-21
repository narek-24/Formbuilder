import { type FormSchemaField } from "../schemas/form-schemas";
import { useBuilderStore } from "../hooks/use-builder-store";
import { fieldRegistry } from "../fields/registry";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  GitBranch,
  Pencil,
  Plus,
  Trash,
  X,
} from "lucide-react";
import { ConditionalForm } from "./conditional-form";

type FieldItemState = "default" | "editing" | "conditional";

export default function FieldItem({ field }: { field: FormSchemaField }) {
  const [fieldItemState, setFieldState] = useState<FieldItemState>(
    field.isSaved ? "default" : "editing"
  );

  const removeField = useBuilderStore((state) => state.removeField);
  const moveField = useBuilderStore((state) => state.moveField);

  function toggleEditing() {
    setFieldState(fieldItemState === "editing" ? "default" : "editing");
  }

  function toggleConditional() {
    setFieldState(fieldItemState === "conditional" ? "default" : "conditional");
  }

  const Icon = fieldRegistry.get(field.type).Icon;

  function setToDefault() {
    setFieldState("default");
  }

  return (
    <div className="card relative px-3 pt-2 pb-3 md:px-4">
      {/* HEADER */}
      <div className="flex items-center gap-1">
        {/* MOVE BUTTONS */}
        <div className="mr-1 flex flex-col [&>button]:text-muted-foreground">
          <Button
            size="icon-xs"
            variant="ghost"
            className="transition-none hover:bg-transparent hover:text-foreground"
            onClick={() => moveField(field.id, "up")}
          >
            <ArrowUp className="size-4" />
          </Button>
          <Button
            size="icon-xs"
            variant="ghost"
            className="transition-none hover:bg-transparent hover:text-foreground"
            onClick={() => moveField(field.id, "down")}
          >
            <ArrowDown className="size-4" />
          </Button>
        </div>

        {/* INFO */}
        <div className="flex items-center gap-2">
          <div className="inline-flex size-8 shrink-0 items-center justify-center rounded bg-muted max-sm:hidden">
            <Icon className="size-5 text-primary-text" />
          </div>
          <h3 className="line-clamp-2 text-sm capitalize md:text-[15px] md:font-medium">
            {fieldItemLabel(field)}
          </h3>
        </div>

        {/* ACTIONS */}
        <div className="ml-auto flex gap-0.25 [&>button]:text-muted-foreground">
          {field.isSaved && (
            <>
              <Button size="icon-sm" variant="ghost">
                <span className="sr-only">Add field below</span>
                <Plus />
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={toggleConditional}
              >
                <span className="sr-only">Conditional logic</span>
                {fieldItemState === "conditional" ? <X /> : <GitBranch />}
              </Button>
              <Button size="icon-sm" variant="ghost" onClick={toggleEditing}>
                <span className="sr-only">Edit field</span>
                {fieldItemState === "editing" ? <X /> : <Pencil />}
              </Button>
            </>
          )}

          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => removeField(field.id)}
          >
            <span className="sr-only">Remove field</span>
            <Trash />
          </Button>
        </div>
      </div>
      {/* CONTENT */}
      <Content
        field={field}
        state={fieldItemState}
        setToDefault={setToDefault}
      />
    </div>
  );
}

function Content({
  field,
  state,
  setToDefault,
}: {
  field: FormSchemaField;
  state: FieldItemState;
  setToDefault: () => void;
}) {
  if (state === "conditional") {
    return (
      <div className="mt-4 px-1.5 pb-2">
        <ConditionalForm field={field} onClose={setToDefault} />
      </div>
    );
  }

  if (state === "editing") {
    const Comp = fieldRegistry.get(field.type).Form;

    return (
      <div className="mt-4 px-1.5 pb-2">
        <Comp field={field} setToDefault={setToDefault} />
      </div>
    );
  }

  const Comp = fieldRegistry.get(field.type).Builder;
  if (!Comp) return null;

  return (
    <div className="mt-4 px-1.5 pb-2">
      <Comp field={field} />
    </div>
  );
}

function fieldItemLabel(field: FormSchemaField) {
  if (field.category === "input") return field.label || "Untitled field";
  if (field.type === "heading") return field.text || "Untitled heading";
  return field.type;
}
