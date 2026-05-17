import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Type } from "lucide-react";
import TextFieldForm from "./form";

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
      description: "",
    };
  },

  Icon: Type,
  Form: TextFieldForm,
  // Builder: ,
  // Renderer: ,
};
