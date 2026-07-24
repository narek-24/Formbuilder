"use client";

import FormRenderer from "@/components/builder/renderer";
import { type FormSchema } from "@/components/builder/schemas/form-schemas";
import { respondToFormAction } from "@/server/actions/responses";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

interface Props {
  fields: FormSchema;
  formId: number;
}

export default function ResponseWrapper({ fields, formId }: Props) {
  const router = useRouter();
  const { execute, isPending, result } = useAction(respondToFormAction, {
    onSuccess: () => {
      router.replace("/form/success");
    },
  });

  function handleSubmit(data: unknown) {
    if (isPending) return;

    execute({ formId, answers: JSON.stringify(data) });
  }

  return (
    <FormRenderer
      fields={fields}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      error={result.serverError}
    />
  );
}
