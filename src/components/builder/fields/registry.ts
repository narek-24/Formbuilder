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

export const fieldRegistry = {
  get(type: FieldType) {
    return FIELDS[type];
  },

  getCategorized() {
    const map = CATEGORIES.reduce(
      (acc, category) => {
        acc[category] = [];
        return acc;
      },
      {} as Record<Category, FieldPlugin[]>
    );

    for (const field of Object.values(FIELDS)) {
      map[field.category]!.push(field);
    }

    return map;
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
