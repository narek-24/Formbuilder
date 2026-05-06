"use client";

import { type FieldType, type FormSchemaField } from "./schemas/form-schemas";
import { useBuilderStore } from "./store";
import { fieldRegistry } from "./fields/registry";
import { Button } from "../ui/button";

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
    <div className="mx-auto space-y-6 md:w-2xl">
      {fields.map((field, i) => (
        <FieldItem key={field.id} field={field} index={i} />
      ))}
    </div>
  );
}

// type FieldItemState = "default" | "editing" | "conditional";

function FieldItem({
  field,
  index,
}: {
  index: number;
  field: FormSchemaField;
}) {
  // const [fieldItemState, setFieldItemState] = useState<FieldItemState>(
  //   field.isSaved ? "default" : "editing"
  // );

  const Icon = fieldRegistry.get(field.type).Icon;
  const removeField = useBuilderStore((state) => state.removeField);

  return (
    <div className="card relative p-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <div className="inline-flex size-8 shrink-0 items-center justify-center rounded bg-muted">
            <Icon className="size-5 text-primary-text" />
          </div>

          <h3>{field.category === "input" ? field.label : field.type}</h3>

          {index}
        </div>

        <Button variant="ghost" onClick={() => removeField(field.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
