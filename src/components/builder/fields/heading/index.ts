import { getBaseLayoutValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Heading2 } from "lucide-react";
import HeadingFieldForm from "./form";

export const HeadingField: FieldPlugin = {
  type: "heading",
  label: "Heading",
  category: "layout",

  getDefaultValues() {
    return {
      ...getBaseLayoutValues(),
      type: "heading",
      space: "2",
      text: "",
    };
  },

  Icon: Heading2,
  Form: HeadingFieldForm,
  Builder: null,
  // Renderer: ,
};
