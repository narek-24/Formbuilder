import type { FieldType, FormSchemaField } from "../schemas/form-schemas";
import type { UseFormReturn } from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import type { Category } from "../schemas/base-schema";
import type z from "zod";

import { CATEGORIES } from "../schemas/base-schema";
import { HeadingField } from "./heading";
import { OptionsField } from "./options";
import { DividerField } from "./divider";
import { NumberField } from "./number";
import { TextField } from "./text";

const FIELDS = {
  text: TextField,
  number: NumberField,
  options: OptionsField,
  heading: HeadingField,
  divider: DividerField,
} as const satisfies Record<FieldType, FieldPlugin>;

interface CategorizedField {
  label: string;
  fields: FieldPlugin[];
}

export const fieldRegistry = {
  get(type: FieldType) {
    return FIELDS[type];
  },

  getCategorized() {
    const result: Record<Category, CategorizedField> = {
      input: { label: CATEGORIES.input, fields: [] },
      layout: { label: CATEGORIES.layout, fields: [] },
    };

    for (const field of Object.values(FIELDS)) {
      result[field.category].fields.push(field);
    }

    return Object.values(result);
  },
} as const;

export interface FieldPlugin {
  type: FieldType;
  icon: LucideIcon;
  label: string;
  category: Category;

  getDefaultValues: () => FormSchemaField;
  createValidator?: ((field: FormSchemaField) => z.ZodTypeAny) | null;

  Form: React.ComponentType<FormProps>;
  Builder: React.ComponentType<BuilderProps> | null;
  Renderer: React.ComponentType<RendererProps>;
}

export interface FormProps {
  field: FormSchemaField;
  setToDefault: () => void;
}

export interface BuilderProps {
  field: FormSchemaField;
}

export interface RendererProps {
  form: UseFormReturn;
  formField: FormSchemaField;
}
