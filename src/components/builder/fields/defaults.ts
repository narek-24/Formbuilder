export function getBaseInputValues() {
  return {
    id: crypto.randomUUID(),
    label: "",
    description: "",
    isRequired: false,
    isSaved: false,
    followUps: undefined,
    category: "input" as const,
  };
}

export function getBaseLayoutValues() {
  return {
    id: crypto.randomUUID(),
    isSaved: false,
    followUps: undefined,
    category: "layout" as const,
  };
}
