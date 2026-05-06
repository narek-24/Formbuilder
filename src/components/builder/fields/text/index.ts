import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Type } from "lucide-react";

export const TextField: FieldPlugin = {
  type: "text",
  label: "Text",
  category: "input",

  getDefaultValues() {
    return {
      ...getBaseInputValues(),
      type: "text",
      longAnswer: false,
      placeholder: "",
    };
  },

  Icon: Type,

  // Form: ,
  // Builder: ,
  // Renderer: ,
};
