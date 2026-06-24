import type { FormSchema } from "../schemas/form-schemas";
import { describe, it, expect } from "vitest";
import { createValidationSchema } from "./create-validation";

describe("createValidationSchema", () => {
  it("builds a validation schema for required text fields", () => {
    const form: FormSchema = [
      {
        id: "text-1",
        type: "text",
        label: "Text",
        category: "input",
        description: "A required text field",
        isSaved: true,
        isRequired: true,
        longAnswer: false,
        placeholder: "",
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "text-1": "" });
    expect(schema.safeParse({ "text-1": "Hello" }).success).toBe(true);
    expect(schema.safeParse({ "text-1": "" }).success).toBe(false);
    expect(schema.safeParse({}).success).toBe(false);
  });

  it("validates number fields with required, min, and max constraints", () => {
    const form: FormSchema = [
      {
        id: "number-1",
        type: "number",
        label: "Number",
        category: "input",
        description: "A required number field",
        isRequired: true,
        isSaved: true,
        min: 1,
        max: 10,
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "number-1": "" });
    expect(schema.safeParse({ "number-1": "5" }).success).toBe(true);
    expect(schema.safeParse({ "number-1": "" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "abc" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "0" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "11" }).success).toBe(false);
  });

  it("validates optional number field with min and max constraints", () => {
    const form: FormSchema = [
      {
        id: "number-1",
        type: "number",
        label: "Number",
        category: "input",
        description: "A required number field",
        isRequired: false,
        isSaved: true,
        min: 1,
        max: 10,
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "number-1": "" });
    expect(schema.safeParse({ "number-1": "5" }).success).toBe(true);
    expect(schema.safeParse({ "number-1": "" }).success).toBe(true);
    expect(schema.safeParse({ "number-1": "abc" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "0" }).success).toBe(false);
    expect(schema.safeParse({ "number-1": "11" }).success).toBe(false);
  });

  it("validates options fields with multiple answers enabled", () => {
    const form: FormSchema = [
      {
        id: "options-1",
        type: "options",
        label: "Options",
        category: "input",
        description: "Select one or more options",
        multipleAnswers: true,
        isRequired: true,
        isSaved: true,
        options: [
          { value: "Option 1" },
          { value: "Option 2" },
          { value: "Option 3" },
        ],
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "options-1": [] });
    expect(schema.safeParse({ "options-1": ["Option 2"] }).success).toBe(true);
    expect(schema.safeParse({ "options-1": [] }).success).toBe(false);
    expect(schema.safeParse({ "options-1": ["Invalid"] }).success).toBe(false);
  });

  it("validates optional options fields with multiple answers disabled", () => {
    const form: FormSchema = [
      {
        id: "options-2",
        type: "options",
        label: "Options",
        category: "input",
        description: "Select one or more options",
        multipleAnswers: false,
        isRequired: false,
        isSaved: true,
        options: [
          { value: "Option 1" },
          { value: "Option 2" },
          { value: "Option 3" },
        ],
      },
    ];

    const { schema, defaultValues } = createValidationSchema(form);

    expect(defaultValues).toEqual({ "options-2": undefined });
    expect(schema.safeParse({ "options-2": "Option 2" }).success).toBe(true);
    expect(schema.safeParse({ "options-2": undefined }).success).toBe(true);
    expect(schema.safeParse({ "options-2": "Invalid" }).success).toBe(false);
  });
});
