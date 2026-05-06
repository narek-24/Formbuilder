import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { List } from "lucide-react";

export const OptionsField: FieldPlugin = {
  type: "options",
  label: "Options",
  category: "input",

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

  Icon: List,

  // Form: ,
  // Builder: ,
  // Renderer: ,
};
