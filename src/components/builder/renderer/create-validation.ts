import {
  type FieldType,
  type FormSchema,
  type FormSchemaField,
} from "../schemas/form-schemas";
import { isInputField } from "../schemas/input-schemas";
import z from "zod";

const MESSAGES = {
  required: "This field is required",
  maxString: "Must be at most 600 characters",
  invalidNumber: "Must be a valid number",
} as const;

function applyStringRules(
  schema: z.ZodString | z.ZodEmail,
  isRequired: boolean
) {
  schema = schema.max(600, { message: MESSAGES.maxString });
  return isRequired
    ? schema.min(1, { message: MESSAGES.required })
    : schema.optional().or(z.literal(""));
}

function createTextFieldSchema(field: FormSchemaField) {
  if (field.type !== "text") throw new Error("Not a text field");
  return applyStringRules(z.string().trim(), field.isRequired);
}

function createOptionsFieldSchema(field: FormSchemaField) {
  if (field.type !== "options") throw new Error("Not options field");

  if (field.multipleAnswers) {
    const schema = field.isRequired
      ? z.array(z.string()).min(1, { message: "Pick at least 1 option" })
      : z.array(z.string());

    return schema.refine((res) => {
      const validOptions = new Set(field.options.map((o) => o.value));
      return res.every((val) => validOptions.has(val));
    });
  }

  if (field.isRequired) {
    return z
      .string({ message: MESSAGES.required })
      .refine((val) => field.options.some((o) => o.value === val), {
        message: "Invalid option",
      });
  }

  return z.string().optional();
}

function createNumberFieldSchema(field: FormSchemaField) {
  if (field.type !== "number") throw new Error("Not a number field");

  const numberSchema = z.string().superRefine((val, ctx) => {
    if (val === "") {
      return field.isRequired
        ? ctx.addIssue({
            code: "custom",
            message: MESSAGES.required,
          })
        : undefined;
    }

    const num = Number(val);
    if (isNaN(num)) {
      ctx.addIssue({
        code: "custom",
        message: MESSAGES.invalidNumber,
      });
      return;
    }

    if (typeof field.min === "number" && num < field.min) {
      ctx.addIssue({
        code: "custom",
        message: `Must be at least ${field.min}`,
      });
    }

    if (typeof field.max === "number" && num > field.max) {
      ctx.addIssue({
        code: "custom",
        message: `Must be at most ${field.max}`,
      });
    }
  });

  return numberSchema;
}

const fieldSchemaFactories = {
  text: createTextFieldSchema,
  number: createNumberFieldSchema,
  options: createOptionsFieldSchema,

  divider: null,
  heading: null,
} as const satisfies Record<
  FieldType,
  ((field: FormSchemaField) => z.ZodTypeAny) | null
>;

function createFieldSchema(field: FormSchemaField) {
  const factory = fieldSchemaFactories[field.type];
  if (!factory) {
    throw new Error(`Unsupported field type: ${field.type}`);
  }

  const schema = factory(field);

  // If a field is conditional then it shouldn't be required, since it might not even be shown.
  return !!field.followUps ? schema.optional() : schema;
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
    defaultValues[field.id] = getDefaultValue(field);
    shape[field.id] = createFieldSchema(field);
  });

  return { schema: z.object(shape), defaultValues };
}
