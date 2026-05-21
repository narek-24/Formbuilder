import { getBaseLayoutValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { Divide } from "lucide-react";
import DividerFieldForm from "./form";
import DividerFieldRenderer from "./renderer";

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
  Form: DividerFieldForm,
  Builder: null,
  Renderer: DividerFieldRenderer,
};
