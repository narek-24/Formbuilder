"use client";

import {
  type FieldType,
  type FormSchema,
  type FormSchemaField,
} from "../schemas/form-schemas";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { fieldRegistry } from "../fields/registry";

interface Settings {
  title: string;
  description: string;
}

interface Store {
  settings: Settings;
  setTitle: (title: string) => void;

  fields: FormSchema;
  addField: (type: FieldType, index?: number) => void;
  setFields: (fields: FormSchema) => void;
  editField: (field: FormSchemaField) => void;
  removeField: (id: string) => void;
  moveField: (id: string, dir: "up" | "down") => void;
}

export const useBuilderStore = create(
  persist<Store>(
    (set) => ({
      settings: { title: "", description: "" },
      setTitle: (title) => {
        set((state) => ({ settings: { ...state.settings, title } }));
      },

      fields: [],

      setFields: (fields) => {
        set({ fields });
      },

      addField: (type, index) => {
        const field = fieldRegistry.get(type).getDefaultValues();

        set((state) => {
          if (typeof index === "number") {
            return {
              fields: state.fields
                .toSpliced(index, 0, field)
                .filter((f) => f.isSaved || f.id === field.id),
            };
          } else {
            return {
              fields: state.fields
                .filter((f) => f.isSaved || f.id === field.id)
                .concat(field),
            };
          }
        });
      },

      editField: (field) => {
        set((state) => ({
          fields: state.fields.map((f) => (f.id !== field.id ? f : field)),
        }));
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

      moveField: (id, dir) => {
        set((state) => {
          const idx = state.fields.findIndex((field) => field.id === id);
          if (idx === -1) return { fields: state.fields };

          const field = state.fields[idx]!;
          const newIdx = idx + (dir === "up" ? -1 : 1);

          if (newIdx < 0 || newIdx > state.fields.length)
            return { fields: state.fields };

          const fields = state.fields
            .filter((field) => field.id !== id)
            .toSpliced(newIdx, 0, field);

          return { fields: fields };
        });
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
