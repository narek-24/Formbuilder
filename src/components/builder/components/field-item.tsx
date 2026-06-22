import { useCallback, useState } from "react";
import { type FormSchemaField } from "../schemas/form-schemas";
import { useBuilderStore } from "../hooks/use-builder-store";
import { fieldRegistry } from "../fields/registry";
import { Button } from "@/components/ui/button";
import ConditionalForm from "./conditional-form";
import {
  ArrowDown,
  ArrowUp,
  GitBranch,
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

  const Icon = fieldRegistry.get(field.type).icon;

  const setToDefault = useCallback(() => {
    setMode(FieldItemMode.Default);
  }, []);

  const isConditional = !!field.followUps;

  return (
    <div className="card relative px-3 pt-2 pb-3 md:px-4">
      <div className="flex items-center gap-1">
        <MoveButtons fieldId={field.id} />

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
          <ActionsDropdown setMode={setMode} field={field} index={index} />
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

    [FieldItemMode.Editing]: Form ? (
      <Form field={field} setToDefault={setToDefault} />
    ) : null,

    [FieldItemMode.Conditional]: (
      <ConditionalForm field={field} setToDefault={setToDefault} />
    ),
  };

  return views[mode];
}

function MoveButtons({ fieldId }: { fieldId: string }) {
  const moveField = useBuilderStore((state) => state.moveField);

  return (
    <div className="mr-1 flex flex-col [&>button]:text-muted-foreground">
      <Button
        size="icon-xs"
        variant="ghost"
        className="transition-none hover:bg-transparent hover:text-foreground"
        onClick={() => moveField(fieldId, "up")}
      >
        <ArrowUp className="size-4" />
      </Button>
      <Button
        size="icon-xs"
        variant="ghost"
        className="transition-none hover:bg-transparent hover:text-foreground"
        onClick={() => moveField(fieldId, "down")}
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
}

function ActionsDropdown({
  field,
  index,
  setMode,
}: {
  field: FormSchemaField;
  index: number;
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Settings className="text-muted-foreground" />
        <span className="sr-only">Field actions</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuItem onClick={() => setMode(FieldItemMode.Editing)}>
          <Pencil />
          Edit Field
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setMode(FieldItemMode.Conditional)}>
          <GitBranch />
          {hasFollowUp ? "Edit Logic" : "Configure Logic"}
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
