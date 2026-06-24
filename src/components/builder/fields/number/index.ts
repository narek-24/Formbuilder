import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Sigma } from "lucide-react";
import NumberFieldForm from "./form";
import BuilderNumberField from "./builder";
import NumberFieldRenderer from "./renderer";
import z from "zod";
import type { FormSchemaField } from "../../schemas/form-schemas";

export const NumberField: FieldPlugin = {
  type: "number",
  label: "Number",
  category: "input",
  icon: Sigma,

  getDefaultValues() {
    return {
      ...getBaseInputValues(),
      type: "number",
      min: "",
      max: "",
    };
  },

  createValidator(field: FormSchemaField) {
    if (field.type !== "number") throw new Error("Not a number field");

    const numberSchema = z.string().superRefine((val, ctx) => {
      if (val === "") {
        return field.isRequired
          ? ctx.addIssue({
              code: "custom",
              message: "This field is required",
            })
          : undefined;
      }

      const num = Number(val);
      if (isNaN(num)) {
        ctx.addIssue({
          code: "custom",
          message: "Must be a valid number",
        });
        return;
      }

      if (typeof field.min === "number" && num < field.min) {
        ctx.addIssue({
          code: "custom",
          message: `Must be at least ${field.min}`,
        });
      }

      if (typeof field.max === "number" && num > field.max) {
        ctx.addIssue({
          code: "custom",
          message: `Must be at most ${field.max}`,
        });
      }
    });

    return numberSchema;
  },

  Form: NumberFieldForm,
  Builder: BuilderNumberField,
  Renderer: NumberFieldRenderer,
};
