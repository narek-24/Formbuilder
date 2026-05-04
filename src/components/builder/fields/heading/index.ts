import { type FieldPlugin } from "../registry";
import { Heading2 } from "lucide-react";

export const HeadingField: FieldPlugin = {
  type: "heading",
  label: "Heading",
  category: "layout",
  Icon: Heading2,

  // Form: ,
  // Builder: ,
  // Renderer: ,
};
