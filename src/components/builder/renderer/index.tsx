"use client";

import type { FormSchema } from "../schemas/form-schemas";
import { fieldRegistry } from "../fields/registry";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function FormRenderer({
  fields,
  onSubmit,
}: {
  fields: FormSchema;
  onSubmit: (data: unknown) => void;
}) {
  //  const { schema, defaultValues } = useMemo(
  //     () => createValidationSchema(fields),
  //     []
  //   );

  const form = useForm({
    // resolver: zodResolver(schema)
    // defaultValues,
  });

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid h-fit max-w-lg gap-8"
      >
        {fields.map((formField) => {
          const Comp = fieldRegistry.get(formField.type).Renderer;
          return <Comp key={formField.id} formField={formField} form={form} />;
        })}

        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </div>
  );
}
