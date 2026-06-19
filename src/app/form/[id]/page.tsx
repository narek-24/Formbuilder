// export async function generateMetadata({
//   params,
// }: PageProps<"/form/[id]">): Promise<Metadata> {
//   const { id } = await params;
//   const form = await getFormById(Number(id));

//   if (!form) {
//     return {};
//   }

//   return {
//     title: form.title ? `${form.title} - Formbuilder` : "Form",
//     description:
//       form.description ||
//       "Fill out the form on this page for your specific needs.",
//     openGraph: {
//       title: form.title,
//       description:
//         form.description || "Complete the form to submit your responses.",
//       url: `${process.env.VERCEL_URL}/form/${form.id}`,
//       type: "website",
//     },
//     twitter: {
//       title: form.title,
//       description:
//         form.description || "Complete the form to submit your responses.",
//     },
//   };
// }

export default function AnswerFormPage() {
  return (
    <div>
      <h1>Answer form page</h1>
    </div>
  );
}
