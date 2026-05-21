"use client";

import { useBuilderStore } from "./hooks/use-builder-store";
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

  return (
    <div className="mx-auto space-y-8 md:w-2xl">
      {fields.map((field) => (
        <FieldItem key={field.id} field={field} />
      ))}
    </div>
  );
}
