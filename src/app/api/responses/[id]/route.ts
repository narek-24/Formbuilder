import { getServerSession } from "@/server/auth/config";
import { type NextRequest } from "next/server";
import { forms, responses } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import type { FormSchema } from "@/components/builder/schemas/form-schemas";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/responses/[id]">
) {
  const session = await getServerSession();
  if (!session) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, Number(id)),
  });

  if (!form) return Response.json({ msg: "Form not found" }, { status: 404 });

  if (form.userId !== session.user.id)
    return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const rows = await db.query.responses.findMany({
    where: eq(responses.formId, Number(id)),
    orderBy: responses.createdAt,
    columns: { answers: true },
  });

  const fields = form.content as FormSchema;
  const fileName = form.title.replace(/[\/\\:*?"<>|]/g, "_");
  const answers = rows.map((r) => r.answers);

  return Response.json({
    fields,
    answers,
    fileName,
  });
}

export type GetResponsesType = {
  fileName: string;
  fields: FormSchema;
  answers: unknown[];
};
