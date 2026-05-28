import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Type } from "lucide-react";
import TextFieldForm from "./form";
import BuilderTextField from "./builder";
import TextFieldRenderer from "./renderer";

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

  Form: TextFieldForm,
  Builder: BuilderTextField,
  Renderer: TextFieldRenderer,
};
