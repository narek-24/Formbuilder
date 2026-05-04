import { z } from "zod";

import * as layoutSchemas from "./layout-schemas";
import * as inputSchemas from "./input-schemas";

export const formSchema = z.array(
  z.discriminatedUnion("category", [
    z.discriminatedUnion("type", [
      inputSchemas.numberFieldSchema,
      inputSchemas.optionsFieldSchema,
      inputSchemas.textFieldSchema,
      layoutSchemas.dividerFieldSchema,
      layoutSchemas.headingFieldSchema,
    ]),
  ])
);

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaField = FormSchema[number];
export type FieldType = FormSchema[number]["type"];
