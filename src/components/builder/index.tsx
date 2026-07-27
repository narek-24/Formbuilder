"use client";

import { DragDropProvider, DragOverlay, useDroppable } from "@dnd-kit/react";
import { useBuilderStore } from "./hooks/use-builder-store";
import { useMediaQuery } from "@/hooks/use-media-query";
import { isSortable } from "@dnd-kit/react/sortable";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import TemplatesDialog from "./components/templates";
import AddFieldDialog from "./components/dialogs/add-field-dialog";
import FieldPanel, { FieldPanelItemOverlay } from "./components/field-panel";
import FieldItem, { FieldItemOverlay } from "./components/field-item";

export default function Builder() {
  const addField = useBuilderStore((state) => state.addField);
  const reorderField = useBuilderStore((state) => state.reorderField);

  return (
    <DragDropProvider
      onDragEnd={(e) => {
        const { source, target } = e.operation;
        if (e.canceled || !source || !target) return;

        if (isSortable(source)) {
          const destIdx = isSortable(target)
            ? target.index - (source.index < target.index ? 1 : 0)
            : undefined;

          reorderField(source.index, destIdx);
          return;
        }

        if (source.data.isPanelItem) {
          addField(
            source.data.type,
            isSortable(target) ? target.index : undefined
          );

          return;
        }
      }}
    >
      <div className="container grid gap-8 pb-9 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_300px]">
        <FieldPanel />
        <FieldsList />
      </div>

      <DragOverlay dropAnimation={null}>
        {({ data }) =>
          data.isPanelItem ? (
            <FieldPanelItemOverlay Icon={data.icon} label={data.label} />
          ) : (
            <FieldItemOverlay field={data.field} mode={data.mode} />
          )
        }
      </DragOverlay>
    </DragDropProvider>
  );
}

function FieldsList() {
  const fields = useBuilderStore((state) => state.fields);
  const isMobile = useMediaQuery("(max-width: 768px)", { defaultValue: false });

  const { ref, isDropTarget } = useDroppable({
    id: `drop-zone`,
  });

  if (fields.length === 0) {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-2xl rounded-xl border-2 border-transparent pt-14 text-center",
          {
            "border-dashed border-primary/60 bg-primary/5": isDropTarget,
          }
        )}
      >
        <div className="mx-auto mb-6 flex size-18 items-center justify-center rounded-full border bg-muted">
          <FileText className="size-8.5 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold tracking-tight">
          Your form is empty.
        </h3>

        <p className="mx-auto mt-3 mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          Drag a field here from the left panel to get started, or choose a
          template to create a form in seconds. You can reorder fields,
          configure logic, and customize the experience at any time.
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
    <div className="mx-auto w-full max-w-2xl space-y-4">
      {fields.map((field, i) => (
        <FieldItem key={field.id} field={field} index={i} />
      ))}

      <div
        ref={ref}
        className={cn(
          "relative h-9 rounded-xl border-2 border-dashed transition-all",
          {
            "border-primary/60 bg-primary/5": isDropTarget,
          }
        )}
      >
        <div className="flex h-full items-center justify-center text-xs font-medium tracking-[0.2rem] text-muted-foreground uppercase">
          Drop here
        </div>
      </div>

      {isMobile && <AddFieldDialog />}
    </div>
  );
}
