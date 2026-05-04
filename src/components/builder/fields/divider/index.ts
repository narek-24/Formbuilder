import { type FieldPlugin } from "../registry";
import { Divide } from "lucide-react";

export const DividerField: FieldPlugin = {
  type: "divider",
  label: "Divider",
  category: "layout",
  Icon: Divide,

  // Form: ,
  // Builder: ,
  // Renderer: ,
};
