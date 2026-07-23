import { type Metadata } from "next";
import { CircleQuestionMark } from "lucide-react";
import { getFormById } from "@/server/queries/forms";
import { formSchema } from "@/components/builder/schemas/form-schemas";
import ResponseWrapper from "../_components/response-wrapper";

function validateId(id: string) {
  return /^\d+$/.test(id);
}

export async function generateMetadata({
  params,
}: PageProps<"/form/[id]">): Promise<Metadata> {
  const { id } = await params;
  if (!validateId(id)) return {};

  const form = await getFormById(Number(id));
  if (!form) return {};

  return {
    title: form.title ? `${form.title} - Formbuilder` : "Form",
    description:
      form.description ||
      "Fill out the form on this page for your specific needs.",
    openGraph: {
      title: form.title,
      description:
        form.description || "Complete the form to submit your responses.",
      url: `${process.env.VERCEL_URL}/form/${form.id}`,
      type: "website",
    },
    twitter: {
      title: form.title,
      description:
        form.description || "Complete the form to submit your responses.",
    },
  };
}

export default async function AnswerFormPage({
  params,
}: PageProps<"/form/[id]">) {
  const { id } = await params;
  if (!validateId(id)) return <InvalidPage />;

  const form = await getFormById(Number(id));
  if (!form || form.status !== "published") {
    return <InvalidPage />;
  }

  const { data, success } = formSchema.safeParse(form.content);
  if (!success) return <InvalidPage />;

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-2xl rounded-2xl md:border-2 md:bg-card md:p-8">
        <h1 className="mb-4 text-center text-2xl font-semibold md:text-3xl">
          {form.title}
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">
          {form.description}
        </p>

        <ResponseWrapper fields={data} formId={form.id} />
      </div>
    </div>
  );
}

function InvalidPage() {
  return (
    <div className="mx-auto max-w-lg pt-24 text-center md:pt-38">
      <div className="mx-auto mb-6 flex size-18 items-center justify-center rounded-full border bg-muted">
        <CircleQuestionMark className="size-10 text-muted-foreground" />
      </div>

      <h1 className="mb-3 text-xl font-semibold tracking-tight">
        This form isn&apos;t available
      </h1>

      <p className="text-pretty text-muted-foreground">
        The link may be invalid, the form may have expired, or it is no longer
        accepting responses.
      </p>
    </div>
  );
}
