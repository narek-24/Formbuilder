import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Type } from "lucide-react";
import TextFieldForm from "./form";
import BuilderTextField from "./builder";
import TextFieldRenderer from "./renderer";
import z from "zod";
import type { FormSchemaField } from "../../schemas/form-schemas";

export const TextField: FieldPlugin = {
  type: "text",
  label: "Text",
  category: "input",
  icon: Type,

  getDefaultValues() {
    return {
      ...getBaseInputValues(),
      type: "text",
      longAnswer: false,
      placeholder: "",
      description: "",
    };
  },

  createValidator(field: FormSchemaField) {
    if (field.type !== "text") throw new Error("Not a text field");

    const schema = z
      .string()
      .trim()
      .max(600, { message: "Must be at most 600 characters" });
    return field.isRequired
      ? schema.min(1, { message: "This field is required" })
      : schema.optional().or(z.literal(""));
  },

  Form: TextFieldForm,
  Builder: BuilderTextField,
  Renderer: TextFieldRenderer,
};
