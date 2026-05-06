import { getBaseLayoutValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Divide } from "lucide-react";

export const DividerField: FieldPlugin = {
  type: "divider",
  label: "Divider",
  category: "layout",

  getDefaultValues() {
    return {
      ...getBaseLayoutValues(),
      type: "divider",
      space: "2",
    };
  },

  Icon: Divide,
  // Form: ,
  // Builder: ,
  // Renderer: ,
};
