import { fieldRegistry } from "../fields/registry";
import { useBuilderStore } from "../hooks/use-builder-store";
import type { FieldType } from "../schemas/form-schemas";

const categorizedFields = fieldRegistry.getCategorized();

export default function FieldPanel() {
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
          <h3 className="mb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
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
