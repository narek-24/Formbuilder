import { Button } from "@base-ui/react";
import { useBuilderStore } from "../../hooks/use-builder-store";
import { type Template, TEMPLATES } from "./data";

export default function TemplatesContent({
  setOpen,
}: {
  setOpen: (b: boolean) => void;
}) {
  const setFields = useBuilderStore((state) => state.setFields);
  const setTitle = useBuilderStore((state) => state.setTitle);
  const setDescription = useBuilderStore((state) => state.setDescription);

  function setTemplate(template: Template) {
    setFields(template.fields);
    setTitle(template.title);
    setDescription(template.description);
    setOpen(false);
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {TEMPLATES.map((t, i) => (
        <li key={i}>
          <Button
            className="cursor-pointer rounded-lg border-2 p-4 text-left hover:bg-muted-hover focus-visible:bg-muted-hover"
            onClick={() => setTemplate(t)}
          >
            <h3 className="mb-1 font-bold">{t.title}</h3>
            <p className="text-sm text-muted-foreground">
              {t.templateDescription}
            </p>
          </Button>
        </li>
      ))}
    </ul>
  );
}
