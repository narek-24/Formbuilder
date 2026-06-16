"use client";

import { useBuilderStore } from "./hooks/use-builder-store";
import { FileText } from "lucide-react";
import FieldPanel from "./components/field-panel";
import FieldItem from "./components/field-item";
import TemplatesDialog from "./components/templates";
import { useMediaQuery } from "@/hooks/use-media-query";
import AddFieldDialog from "./components/add-field";

export default function Builder() {
  return (
    <div className="container grid gap-8 pb-9 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_300px]">
      <FieldPanel />
      <FieldsList />
    </div>
  );
}

function FieldsList() {
  const fields = useBuilderStore((state) => state.fields);
  const isMobile = useMediaQuery("(max-width: 768px)", { defaultValue: false });

  if (fields.length === 0) {
    return (
      <div className="mx-auto max-w-2xl pt-14 text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border bg-muted">
          <FileText className="size-9 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold tracking-tight">
          Your form is empty.
        </h3>

        <p className="mx-auto mt-3 mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          Add a field from the left panel to get started, or choose a template
          to create a form in seconds. You can reorder fields, configure logic,
          and customize the experience at any time.
        </p>

        <TemplatesDialog />
        {isMobile && (
          <div>
            <p className="my-2 text-muted-foreground">Or</p> <AddFieldDialog />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {fields.map((field, i) => (
        <FieldItem key={field.id} field={field} index={i} />
      ))}

      {isMobile && <AddFieldDialog />}
    </div>
  );
}
