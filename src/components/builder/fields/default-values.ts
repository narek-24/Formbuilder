import type { FieldType, FormSchemaField } from "../schemas/form-schemas";

export function getDefaultValues(type: FieldType): FormSchemaField {
  const baseInput = {
    id: crypto.randomUUID(),
    label: "",
    description: "",
    isRequired: false,
    isSaved: false,
    followUps: undefined,
    category: "input" as const,
  };

  const baseLayout = {
    id: crypto.randomUUID(),
    isSaved: false,
    followUps: undefined,
    category: "layout" as const,
  };

  switch (type) {
    case "text":
      return {
        ...baseInput,
        type: "text",
        longAnswer: false,
        placeholder: "",
      };

    case "options":
      return {
        ...baseInput,
        type: "options",
        multipleAnswers: false,
        options: [
          { value: "Option 1" },
          { value: "Option 2" },
          { value: "Option 3" },
        ],
      };

    case "number":
      return {
        ...baseInput,
        type: "number",
        min: "",
        max: "",
      };

    case "divider":
      return {
        ...baseLayout,
        type: "divider",
        space: "2",
      };

    case "heading":
      return {
        ...baseLayout,
        type: "heading",
        text: "",
        space: "2",
      };
  }
}
