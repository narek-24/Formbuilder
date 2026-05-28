import { getBaseLayoutValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Heading2 } from "lucide-react";
import HeadingFieldForm from "./form";
import HeadingFieldRenderer from "./renderer";

export const HeadingField: FieldPlugin = {
  type: "heading",
  label: "Heading",
  category: "layout",
  icon: Heading2,

  getDefaultValues() {
    return {
      ...getBaseLayoutValues(),
      type: "heading",
      space: "1",
      text: "",
    };
  },

  Form: HeadingFieldForm,
  Builder: null,
  Renderer: HeadingFieldRenderer,
};
