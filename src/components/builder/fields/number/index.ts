import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Sigma } from "lucide-react";
import NumberFieldForm from "./form";
import BuilderNumberField from "./builder";
import NumberFieldRenderer from "./renderer";

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

  Form: NumberFieldForm,
  Builder: BuilderNumberField,
  Renderer: NumberFieldRenderer,
};
