"use client";

import { type FormSchema, type FormSchemaField } from "./schemas/form-schemas";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface Store {
  fields: FormSchema;
  addField: (field: FormSchemaField, index?: number) => void;
  setFields: (fields: FormSchema) => void;
  removeField: (id: string) => void;
}

export const useBuilderStore = create(
  persist<Store>(
    (set) => ({
      fields: [],

      setFields: (fields) => {
        set({ fields });
      },

      addField: (field, index) => {
        set((state) => {
          if (typeof index === "number") {
            return {
              fields: state.fields.toSpliced(index, 0, field),
              // .filter((f) => f.isSaved || f.id === field.id),
            };
          } else {
            return {
              fields: state.fields
                // .filter((f) => f.isSaved || f.id === field.id)
                .concat(field),
            };
          }
        });
      },

      removeField: (id) => {
        set((state) => ({
          fields: state.fields
            .filter((field) => field.id !== id)
            .map((field) =>
              field.followUps?.parentId === id
                ? { ...field, followUps: undefined }
                : field
            ),
        }));
      },
    }),
    {
      name: "form-builder",
      partialize: (state) => {
        return { ...state, fields: state.fields.filter((f) => f.isSaved) };
      },
    }
  )
);
