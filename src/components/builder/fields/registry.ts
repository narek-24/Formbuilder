import type { FieldType, FormSchemaField } from "../schemas/form-schemas";
import type { UseFormReturn } from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import type { Category } from "../schemas/base-schema";

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

type CategorizedField = {
  label: string;
  fields: FieldPlugin[];
};

export const fieldRegistry = {
  categorizedFields: null as CategorizedField[] | null,

  get(type: FieldType) {
    return FIELDS[type];
  },

  getCategorized() {
    if (this.categorizedFields) return this.categorizedFields;

    const result: Record<Category, CategorizedField> = {
      input: { label: CATEGORIES.input, fields: [] },
      layout: { label: CATEGORIES.layout, fields: [] },
    };

    const fields = Object.values(FIELDS);

    for (const field of fields) {
      result[field.category].fields.push(field);
    }

    this.categorizedFields = Object.values(result);
    return this.categorizedFields;
  },
};

export interface FieldPlugin {
  type: FieldType;
  label: string;
  category: Category;
  getDefaultValues: () => FormSchemaField;

  Icon: LucideIcon;
  Form: React.ComponentType<FormProps>;
  Builder: React.ComponentType<BuilderProps> | null;
  Renderer: React.ComponentType<RendererProps>;
}

export type FormProps = {
  field: FormSchemaField;
  setToDefault: () => void;
};

export type BuilderProps = {
  field: FormSchemaField;
};

export type RendererProps = {
  form: UseFormReturn;
  formField: FormSchemaField;
};
