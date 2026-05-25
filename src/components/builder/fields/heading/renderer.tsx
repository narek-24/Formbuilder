import type { RendererProps } from "../registry";

export default function HeadingFieldRenderer({ formField }: RendererProps) {
  if (formField.type !== "heading") return null;

  return <h2 className="text-xl font-semibold">{formField.text}</h2>;
}
