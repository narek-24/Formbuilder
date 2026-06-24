import { getBaseLayoutValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Divide } from "lucide-react";
import DividerFieldForm from "./form";
import DividerFieldRenderer from "./renderer";

export const DividerField: FieldPlugin = {
  type: "divider",
  label: "Divider",
  category: "layout",
  icon: Divide,

  getDefaultValues() {
    return {
      ...getBaseLayoutValues(),
      type: "divider",
      space: "1",
    };
  },

  createValidator: null,

  Form: DividerFieldForm,
  Builder: null,
  Renderer: DividerFieldRenderer,
};
