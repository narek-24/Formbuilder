import z from "zod";
import type { ZodTypeAny } from "zod";
import type { FormSchema, FormSchemaField } from "../schemas/form-schemas";

const REQUIRED_MESSAGE = "This field is required";

function applyStringRules(
  schema: z.ZodString | z.ZodEmail,
  isRequired: boolean
): any {
  schema = schema.max(600, { message: "Must be at most 600 characters" });
  return isRequired
    ? schema.min(1, { message: REQUIRED_MESSAGE })
    : schema.optional().or(z.literal(""));
}

function createOptionsSchema(field: FormSchemaField): ZodTypeAny {
  if (field.type !== "options") throw "Not options field";

  if (field.multipleAnswers) {
    const schema = field.isRequired
      ? z.array(z.string()).min(1, { message: "Pick at least 1 option" })
      : z.array(z.string());

    return schema.refine((res) =>
      res.every((val) => field.options.map((f) => f.value).includes(val))
    );
  } else {
    const schema = field.isRequired
      ? z
          .string({ message: REQUIRED_MESSAGE })
          .refine((val) => field.options.some((o) => o.value === val), {
            message: "Invalid option",
          })
      : z.string().optional();

    return schema;
  }
}

function createNumberSchema(field: FormSchemaField): ZodTypeAny {
  if (field.type !== "number") throw "Not number field";

  let numberSchema = z.coerce.number({ message: "Must be a number" });
  if (typeof field.min === "number") {
    numberSchema = numberSchema.min(field.min, {
      message: `Must be at least ${field.min}`,
    });
  }

  if (typeof field.max === "number") {
    numberSchema = numberSchema.max(field.max, {
      message: `Must be at most ${field.max}`,
    });
  }

  return numberSchema;
}

function createFieldSchema(field: FormSchemaField): ZodTypeAny {
  if (field.category !== "input") throw Error("");

  const isRequired = field.isRequired && !field.followUps;

  switch (field.type) {
    case "text": {
      return applyStringRules(z.string().trim(), field.isRequired);
    }

    case "options": {
      const baseSchema = createOptionsSchema({
        ...field,
        isRequired: isRequired,
      });
      return baseSchema;
    }

    case "number": {
      const numberSchema = createNumberSchema(field);
      return isRequired
        ? numberSchema.refine((val) => !isNaN(val as number), {
            message: "This field is required and must be a valid number",
          })
        : z
            .literal("")
            .transform(() => undefined)
            .or(numberSchema.optional());
    }

    default:
      throw new Error("Unsupported field type");
  }
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
  const shape: Record<string, ZodTypeAny> = {};
  const defaultValues: Record<string, any> = {};

  form
    .filter((f) => f.category === "input")
    .forEach((field) => {
      defaultValues[field.id] = getDefaultValue(field);
      shape[field.id] = createFieldSchema(field);
    });

  return { schema: z.object(shape), defaultValues };
}
