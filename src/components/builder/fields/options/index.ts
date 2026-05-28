import { getBaseInputValues } from "../defaults";
import { type FieldPlugin } from "../registry";
import { List } from "lucide-react";
import OptionsFieldForm from "./form";
import BuilderOptionsField from "./builder";
import OptionsFieldRenderer from "./renderer";

export const OptionsField: FieldPlugin = {
  type: "options",
  label: "Options",
  category: "input",
  icon: List,

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

  Form: OptionsFieldForm,
  Builder: BuilderOptionsField,
  Renderer: OptionsFieldRenderer,
};
