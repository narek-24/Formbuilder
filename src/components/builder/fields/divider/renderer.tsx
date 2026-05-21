import { cn } from "@/lib/utils";
import type { RendererProps } from "../registry";

export default function DividerFieldRenderer({ formField }: RendererProps) {
  if (formField.type !== "divider") return null;

  return (
    <hr
      className={cn("border-t-2", {
        "my-0": formField.space === "1",
        "my-2": formField.space === "2",
        "my-4": formField.space === "3",
      })}
    />
  );
}
