import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Sigma } from "lucide-react";

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

  // Form: ,
  // Builder: ,
  // Renderer: ,
};
