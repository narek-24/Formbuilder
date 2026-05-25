"use client";

import { useBuilderStore } from "./hooks/use-builder-store";
import { FilePlus2 } from "lucide-react";
import FieldPanel from "./components/field-panel";
import FieldItem from "./components/field-item";

export default function Builder() {
  return (
    <div className="container grid gap-8 pt-4 pb-9 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_300px]">
      <FieldPanel />
      <FieldsList />
    </div>
  );
}

function FieldsList() {
  const fields = useBuilderStore((state) => state.fields);

  if (fields.length === 0) {
    return (
      <div className="mx-auto max-w-2xl pt-14 text-center md:pt-20">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted">
          <FilePlus2 className="size-7 text-muted-foreground" />
        </div>

        <h2 className="text-lg font-semibold tracking-tight">
          Start building your form
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Add your first field from the left panel to begin creating your form.
          You can reorder fields, configure logic, and customize everything
          later.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {fields.map((field) => (
        <FieldItem key={field.id} field={field} />
      ))}
    </div>
  );
}
