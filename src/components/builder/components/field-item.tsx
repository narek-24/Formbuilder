import { useCallback, useState } from "react";
import { type FormSchemaField } from "../schemas/form-schemas";
import { useBuilderStore } from "../hooks/use-builder-store";
import { fieldRegistry } from "../fields/registry";
import { useSortable } from "@dnd-kit/react/sortable";
import { Button } from "@/components/ui/button";
import ConditionalForm from "./conditional-form";
import {
  GitBranch,
  GripVertical,
  Pencil,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { SortableKeyboardPlugin } from "@dnd-kit/dom/sortable";
import { cn } from "@/lib/utils";

enum FieldItemMode {
  Default,
  Editing,
  Conditional,
}

function fieldItemLabel(field: FormSchemaField) {
  if (field.category === "input") return field.label || "Untitled field";
  if (field.type === "heading") return field.text || "Untitled heading";
  return field.type;
}

export default function FieldItem({
  field,
  index,
}: {
  field: FormSchemaField;
  index: number;
}) {
  const [mode, setMode] = useState<FieldItemMode>(
    field.isSaved ? FieldItemMode.Default : FieldItemMode.Editing
  );

  const { ref, handleRef, isDropTarget, isDragging, isDragSource } =
    useSortable({
      index,
      id: field.id,
      transition: { duration: 0 },
      data: { type: "field", isPanelItem: false },
      plugins: [SortableKeyboardPlugin],
    });

  const setToDefault = useCallback(() => {
    setMode(FieldItemMode.Default);
  }, []);

  const Icon = fieldRegistry.get(field.type).icon;
  const isConditional = !!field.followUps;
  const showDropIndicator = isDropTarget && !isDragSource;

  return (
    <div
      ref={ref}
      className={cn("card relative px-3 pt-4 pb-3", {
        "border-primary/60 bg-primary/5": showDropIndicator,
        "opacity-50": isDragging,
      })}
    >
      {showDropIndicator && (
        <div className="absolute inset-x-3 -top-3 flex justify-center">
          <div className="rounded-full border border-primary/40 bg-background px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase shadow-sm">
            Drop here
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* <MoveButtons fieldId={field.id} /> */}
        <Button size="icon" variant="ghost" ref={handleRef}>
          <GripVertical className="size-5 text-muted-foreground" />
        </Button>

        <div className="flex flex-grow items-center gap-2">
          <div className="inline-flex size-7 shrink-0 items-center justify-center rounded bg-muted max-sm:hidden">
            <Icon className="size-5" />
          </div>
          <h3 className="line-clamp-2 text-sm capitalize md:text-[15px] md:font-medium">
            {fieldItemLabel(field)}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isConditional && (
            <span className="text-xs text-muted-foreground">Condtional</span>
          )}
          <ActionsDropdown
            mode={mode}
            field={field}
            index={index}
            setMode={setMode}
          />
        </div>
      </div>

      <div className="[&>*:first-child]:mt-3 [&>*:first-child]:px-1.5 [&>*:first-child]:pb-2">
        <Content mode={mode} field={field} setToDefault={setToDefault} />
      </div>
    </div>
  );
}

function Content({
  mode,
  field,
  setToDefault,
}: {
  mode: FieldItemMode;
  field: FormSchemaField;
  setToDefault: () => void;
}) {
  const { Builder, Form } = fieldRegistry.get(field.type);

  const views = {
    [FieldItemMode.Default]: Builder ? <Builder field={field} /> : null,

    [FieldItemMode.Editing]: <Form field={field} setToDefault={setToDefault} />,

    [FieldItemMode.Conditional]: (
      <ConditionalForm field={field} setToDefault={setToDefault} />
    ),
  };

  return views[mode];
}

// function MoveButtons({ fieldId }: { fieldId: string }) {
//   const moveField = useBuilderStore((state) => state.moveField);

//   return (
//     <div className="mr-1 flex flex-col [&>button]:text-muted-foreground">
//       <Button
//         size="icon-xs"
//         variant="ghost"
//         className="transition-none hover:bg-transparent hover:text-foreground"
//         onClick={() => moveField(fieldId, "up")}
//       >
//         <ArrowUp className="size-4" />
//       </Button>
//       <Button
//         size="icon-xs"
//         variant="ghost"
//         className="transition-none hover:bg-transparent hover:text-foreground"
//         onClick={() => moveField(fieldId, "down")}
//       >
//         <ArrowDown className="size-4" />
//       </Button>
//     </div>
//   );
// }

function ActionsDropdown({
  mode,
  index,
  field,
  setMode,
}: {
  index: number;
  mode: FieldItemMode;
  field: FormSchemaField;
  setMode: (state: FieldItemMode) => void;
}) {
  const removeField = useBuilderStore((state) => state.removeField);
  const editField = useBuilderStore((state) => state.editField);

  if (!field.isSaved) {
    return (
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={() => removeField(field.id)}
      >
        <Trash2 className="text-muted-foreground" />
        <span className="sr-only">Delete Field</span>
      </Button>
    );
  }

  const hasFollowUp = !!field.followUps;
  const isEditingMode = mode === FieldItemMode.Editing;
  const isConditionalMode = mode === FieldItemMode.Conditional;

  const handleEditToggle = () => {
    setMode(isEditingMode ? FieldItemMode.Default : FieldItemMode.Editing);
  };

  const handleLogicToggle = () => {
    setMode(
      isConditionalMode ? FieldItemMode.Default : FieldItemMode.Conditional
    );
  };

  const editLabel = isEditingMode ? "Cancel Editing" : "Edit Field";
  const logicLabel = isConditionalMode
    ? "Cancel Logic"
    : hasFollowUp
      ? "Edit Logic"
      : "Configure Logic";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Settings className="text-muted-foreground" />
        <span className="sr-only">Field actions</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuItem onClick={handleEditToggle}>
          <Pencil />
          {editLabel}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogicToggle}>
          <GitBranch />
          {logicLabel}
        </DropdownMenuItem>

        {hasFollowUp && (
          <DropdownMenuItem
            onClick={() => editField({ ...field, followUps: undefined })}
          >
            <X />
            Remove Logic
          </DropdownMenuItem>
        )}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Plus />
            Insert Field Below
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <InsertFieldBelowContent index={index} />
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="danger"
          onClick={() => removeField(field.id)}
        >
          <Trash2 />
          Delete Field
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function InsertFieldBelowContent({ index }: { index: number }) {
  const categorizedFields = fieldRegistry.getCategorized();
  const addField = useBuilderStore((state) => state.addField);

  return (
    <DropdownMenuSubContent>
      {Object.entries(categorizedFields).map(([category, fields]) => (
        <DropdownMenuGroup key={category} className="not-last:mb-2">
          <DropdownMenuLabel>{category} fields</DropdownMenuLabel>
          {fields.map((field) => (
            <DropdownMenuItem
              key={field.type}
              onClick={() => addField(field.type, index + 1)}
            >
              <field.icon className="size-4" />
              {field.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      ))}
    </DropdownMenuSubContent>
  );
}
