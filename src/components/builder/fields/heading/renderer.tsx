import { cn } from "@/lib/utils";
import type { RendererProps } from "../registry";

export default function HeadingFieldRenderer({ formField }: RendererProps) {
  if (formField.type !== "heading") return null;

  return (
    <h2
      className={cn("text-lg font-semibold", {
        "mb-0": formField.space === "1",
        "mb-2": formField.space === "2",
        "mb-4": formField.space === "3",
      })}
    >
      {formField.text}
    </h2>
  );
}
