import { type FormSchemaField } from "../../schemas/form-schemas";
import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { List } from "lucide-react";
import OptionsFieldForm from "./form";
import BuilderOptionsField from "./builder";
import OptionsFieldRenderer from "./renderer";
import z from "zod";

export const OptionsField: FieldPlugin = {
  type: "options",
  label: "Options",
  category: "input",
  icon: List,

  getDefaultValues() {
    return {
      ...getBaseInputValues(),
      type: "options",
      multipleAnswers: false,
      options: [
        { value: "Option 1" },
        { value: "Option 2" },
        { value: "Option 3" },
      ],
    };
  },

  createValidator(field: FormSchemaField) {
    if (field.type !== "options") throw new Error("Not options field");

    if (field.multipleAnswers) {
      const schema = field.isRequired
        ? z.array(z.string()).min(1, { message: "Pick at least 1 option" })
        : z.array(z.string());

      return schema.refine((res) => {
        const validOptions = new Set(field.options.map((o) => o.value));
        return res.every((val) => validOptions.has(val));
      });
    }

    const schema = z
      .string({ message: "This field is required" })
      .refine((val) => field.options.some((o) => o.value === val), {
        message: "Invalid option",
      });

    return field.isRequired ? schema : schema.optional();
  },

  Form: OptionsFieldForm,
  Builder: BuilderOptionsField,
  Renderer: OptionsFieldRenderer,
};
