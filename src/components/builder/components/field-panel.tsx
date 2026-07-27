"use client";

import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
import { fieldRegistry } from "../fields/registry";
import { useDraggable } from "@dnd-kit/react";
import { type FieldPlugin } from "../fields/registry";

export default function FieldPanel() {
  const categorizedFields = fieldRegistry.getCategorized();

  return (
    <div className="scrollbar-stable card sticky top-19 scrollbar-thin h-fit max-h-[calc(100dvh-110px)] overflow-hidden pt-5 pr-4 pb-7 pl-6 hover:overflow-y-auto max-lg:hidden">
      <h2 className="mb-1 font-semibold">Fields</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Drag a field to add to your form
      </p>

      {Object.entries(categorizedFields).map(([category, fields]) => (
        <div key={category} className="not-last:mb-6">
          <h3 className="mb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {category} fields
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {fields.map((field) => (
              <FieldPanelItem key={field.type} field={field} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FieldPanelItem({ field }: { field: FieldPlugin }) {
  const { ref } = useDraggable({
    id: `panel-${field.type}`,
    data: {
      type: field.type,
      label: field.label,
      isPanelItem: true,
    },
    sensors: [
      PointerSensor.configure({
        activationConstraints: [
          new PointerActivationConstraints.Distance({ value: 0 }),
          new PointerActivationConstraints.Delay({ value: 0, tolerance: 0 }),
        ],
      }),
    ],
  });

  return (
    <button
      ref={ref}
      type="button"
      className="flex cursor-grab flex-col items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium hover:bg-muted active:cursor-grabbing"
    >
      <field.icon className="pointer-events-none size-7" />
      {field.label}
    </button>
  );
}
