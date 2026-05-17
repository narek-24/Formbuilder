import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Sigma } from "lucide-react";
import NumberFieldForm from "./form";
import BuilderNumberField from "./builder";

export const NumberField: FieldPlugin = {
  type: "number",
  label: "Number",
  category: "input",

  getDefaultValues() {
    return {
      ...getBaseInputValues(),
      type: "number",
      min: "",
      max: "",
    };
  },

  Icon: Sigma,
  Form: NumberFieldForm,
  Builder: BuilderNumberField,
  // Renderer: ,
};
