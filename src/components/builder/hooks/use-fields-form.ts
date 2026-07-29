import { useEffect, useRef } from "react";
import { useBuilderStore } from "./use-builder-store";
import { type FormSchemaField } from "../schemas/form-schemas";

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
    }, 100);
  }, []);

  return {
    onSubmit,
    firstInputRef,
  };
}
