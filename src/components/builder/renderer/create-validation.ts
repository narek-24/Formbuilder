import { type FormSchema, type FormSchemaField } from "../schemas/form-schemas";
import { isInputField } from "../schemas/input-schemas";
import { fieldRegistry } from "../fields/registry";
import z from "zod";

function createFieldSchema(field: FormSchemaField) {
  const fieldPlugin = fieldRegistry.get(field.type);
  if (!fieldPlugin.createValidator) return;

  const schema = fieldPlugin.createValidator(field);

  return field.followUps ? schema.optional() : schema;
}

function getDefaultValue(field: FormSchemaField) {
  switch (field.type) {
    case "options":
      if (field.multipleAnswers) return [];
      return;
    default:
      return "";
  }
}

export function createValidationSchema(form: FormSchema) {
  const shape: Record<string, any> = {};
  const defaultValues: Record<string, any> = {};

  form.filter(isInputField).forEach((field) => {
    const schema = createFieldSchema(field);
    if (schema) {
      defaultValues[field.id] = getDefaultValue(field);
      shape[field.id] = createFieldSchema(field);
    }
  });

  return { schema: z.object(shape), defaultValues };
}
