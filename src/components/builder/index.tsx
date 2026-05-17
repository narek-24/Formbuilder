"use client";

import { type FieldType, type FormSchemaField } from "./schemas/form-schemas";
import { useBuilderStore } from "./store";
import { fieldRegistry } from "./fields/registry";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  GitBranch,
  Pencil,
  Plus,
  Trash,
  X,
} from "lucide-react";

export default function Builder() {
  return (
    <div className="container grid gap-8 pt-4 pb-9 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_300px]">
      <FieldPanel />
      <FieldsList />
    </div>
  );
}

const categorizedFields = fieldRegistry.getCategorized();

function FieldPanel() {
  const addField = useBuilderStore((state) => state.addField);

  function handleAddField(type: FieldType) {
    const defaultValues = fieldRegistry.get(type).getDefaultValues();
    addField(defaultValues);
  }

  return (
    <div className="scrollbar-stable card sticky top-18 scrollbar-thin h-fit max-h-[calc(100dvh-110px)] overflow-hidden py-5 pr-4 pl-6 hover:overflow-y-auto max-lg:hidden">
      <h2 className="mb-1 font-semibold">Fields</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Click a field to add to your form
      </p>

      {categorizedFields.map((category) => (
        <div className="mb-6" key={category.label}>
          <h3 className="mb-2 text-xs font-medium tracking-wider text-primary-text uppercase">
            {category.label}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {category.fields.map((field) => (
              <button
                key={field.type}
                onClick={() => handleAddField(field.type)}
                className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium hover:bg-muted"
              >
                <field.Icon className="pointer-events-none size-7" />
                {field.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FieldsList() {
  const fields = useBuilderStore((state) => state.fields);

  return (
    <div className="mx-auto space-y-8 md:w-2xl">
      {fields.map((field) => (
        <FieldItem key={field.id} field={field} />
      ))}
    </div>
  );
}

type FieldItemState = "default" | "editing" | "conditional";

function FieldItem({ field }: { field: FormSchemaField }) {
  const [fieldItemState, setFieldState] = useState<FieldItemState>(
    field.isSaved ? "default" : "editing"
  );

  const Icon = fieldRegistry.get(field.type).Icon;
  const Form = fieldRegistry.get(field.type).Form;
  // const Builder = fieldRegistry.get(field.type).Builder;

  const removeField = useBuilderStore((state) => state.removeField);
  const moveField = useBuilderStore((state) => state.moveField);

  function toggleEditing() {
    setFieldState(fieldItemState === "editing" ? "default" : "editing");
  }

  function toggleConditional() {
    setFieldState(fieldItemState === "conditional" ? "default" : "conditional");
  }

  return (
    <div className="card relative space-y-3 p-3 md:px-4">
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
        <div className="flex items-center gap-1.5">
          <div className="inline-flex size-8 shrink-0 items-center justify-center rounded bg-muted max-sm:hidden">
            <Icon className="size-5 text-primary-text" />
          </div>
          <h3 className="line-clamp-2 text-sm capitalize md:text-[15px] md:font-medium">
            {fieldItemLabel(field)}
          </h3>
        </div>

        {/* ACTIONS */}
        <div className="ml-auto flex gap-0.25 [&>button]:text-muted-foreground">
          <Button size="icon-sm" variant="ghost">
            <span className="sr-only">Add field below</span>
            <Plus />
          </Button>
          <Button size="icon-sm" variant="ghost" onClick={toggleConditional}>
            <span className="sr-only">Conditional logic</span>
            {fieldItemState === "conditional" ? <X /> : <GitBranch />}
          </Button>
          <Button size="icon-sm" variant="ghost" onClick={toggleEditing}>
            <span className="sr-only">Edit field</span>
            {fieldItemState === "editing" ? <X /> : <Pencil />}
          </Button>
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
      <div className="px-1.5">
        {fieldItemState === "default" ? (
          "Builder"
        ) : fieldItemState === "editing" ? (
          <Form field={field} />
        ) : (
          "Conditional"
        )}
      </div>
    </div>
  );
}

function fieldItemLabel(field: FormSchemaField) {
  if (field.category === "input") return field.label || "Untitled field";
  if (field.type === "heading") return field.text || "Untitled heading";
  return field.type;
}
