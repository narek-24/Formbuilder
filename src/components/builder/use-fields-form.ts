import { useEffect, useRef } from "react";
import { useBuilderStore } from "./store";
import type { FormSchemaField } from "./schemas/form-schemas";

export function useFieldsForm<T>(field: FormSchemaField, setSaved: () => void) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const editField = useBuilderStore((state) => state.editField);

  function onSubmit(data: T) {
    editField({ ...field, ...data, isSaved: true });
    setSaved();
  }

  useEffect(() => {
    setTimeout(() => {
      firstInputRef.current?.focus();
      if (!field.isSaved) {
        firstInputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  }, [field.isSaved]);

  return {
    onSubmit,
    firstInputRef,
  };
}
