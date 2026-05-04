import { type FieldPlugin } from "../registry";
import { List } from "lucide-react";

export const OptionsField: FieldPlugin = {
  type: "options",
  label: "Options",
  category: "input",
  Icon: List,

  // Form: ,
  // Builder: ,
  // Renderer: ,
};
