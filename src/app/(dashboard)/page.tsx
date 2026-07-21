import { getUserForms } from "@/server/queries/forms";
import FormCard from "./_components/form-card";

export default async function Home() {
  const forms = await getUserForms();

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </ul>
    </>
  );
}
