import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fieldRegistry } from "../fields/registry";
import { useBuilderStore } from "../hooks/use-builder-store";
import { useState } from "react";
import type { FieldType } from "../schemas/form-schemas";

export default function AddFieldDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const categorizedFields = fieldRegistry.getCategorized();
  const addField = useBuilderStore((state) => state.addField);

  function handleClick(type: FieldType) {
    addField(type);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="secondary" />}>
        Add new field
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Choose a field</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {Object.entries(categorizedFields).map(([category, fields]) => (
          <div className="mb-6" key={category}>
            <h3 className="mb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {category} fields
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {fields.map((field) => (
                <button
                  key={field.type}
                  onClick={() => handleClick(field.type)}
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium hover:bg-muted"
                >
                  <field.icon className="pointer-events-none size-7" />
                  {field.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
