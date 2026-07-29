"use client";

import {
  type FieldType,
  type FormSchema,
  type FormSchemaField,
} from "../schemas/form-schemas";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fieldRegistry } from "../fields/registry";

interface Settings {
  title: string;
  description: string;
}

interface DraggingField {
  id: string;
  isPanelItem: boolean;
}

interface Store {
  settings: Settings;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;

  draggingField: DraggingField | null;
  setDraggingField: (f: DraggingField | null) => void;

  fields: FormSchema;
  addField: (type: FieldType, index?: number) => void;
  setFields: (fields: FormSchema) => void;
  editField: (field: FormSchemaField) => void;
  removeField: (id: string) => void;
  reorderField: (sourceIdx: number, destIdx?: number) => void;

  reset: () => void;
}

export const useBuilderStore = create(
  persist<Store>(
    (set) => ({
      settings: { title: "", description: "" },
      setTitle: (title) => {
        set((state) => ({ settings: { ...state.settings, title } }));
      },
      setDescription: (description) => {
        set((state) => ({ settings: { ...state.settings, description } }));
      },

      draggingField: null,
      setDraggingField: (draggingField) => {
        set({ draggingField });
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
              fields: state.fields.toSpliced(index, 0, field),
            };
          }

          return {
            fields: state.fields.concat(field),
          };
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

      reorderField: (sourceIdx, destIdx?) => {
        set((state) => {
          const fields = [...state.fields];

          if (sourceIdx < 0 || sourceIdx >= fields.length) {
            return state;
          }

          const [field] = fields.splice(sourceIdx, 1);

          const targetIdx =
            destIdx === undefined
              ? fields.length
              : Math.max(0, Math.min(destIdx, fields.length));

          fields.splice(targetIdx, 0, field!);

          return { fields };
        });
      },

      reset: () => {
        set(() => ({ settings: { title: "", description: "" }, fields: [] }));
      },
    }),
    {
      name: "form-builder",
      partialize: (state) => {
        return {
          ...state,
          draggingField: null,
          fields: state.fields.filter((f) => f.isSaved),
        };
      },
    }
  )
);
