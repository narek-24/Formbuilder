import { FileQuestionMark, Loader2 } from "lucide-react";
import { getUserForms } from "@/server/queries/forms";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import FormCard from "./_components/form-card";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<FormsListShell />}>
        <FormsList />
      </Suspense>
    </>
  );
}

async function FormsList() {
  const forms = await getUserForms();

  if (forms.length === 0) {
    return (
      <div className="mx-auto max-w-lg pt-14 text-center">
        <div className="mx-auto mb-6 flex size-18 items-center justify-center rounded-full border bg-muted">
          <FileQuestionMark className="size-8.5 text-muted-foreground" />
        </div>

        <h1 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
          No forms yet
        </h1>
        <p className="mb-8 leading-6 text-balance text-muted-foreground">
          Create your first form to start collecting responses and managing
          submissions from your dashboard.
        </p>

        <Button
          render={<Link href="/editor" />}
          nativeButton={false}
          variant="default"
          className="w-full sm:w-auto"
        >
          Create form
        </Button>
      </div>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </ul>
  );
}

function FormsListShell() {
  return (
    <div className="grid place-content-center pt-24 md:pt-36">
      <Loader2 className="size-12 animate-spin" />
    </div>
  );
}
