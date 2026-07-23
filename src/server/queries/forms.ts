import "server-only";
import { getServerSession } from "../auth/config";
import { forms, responses } from "../db/schema";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { cache } from "react";

export type GetUserForms = Awaited<ReturnType<typeof getUserForms>>;

export async function getUserForms() {
  const session = await getServerSession();

  if (!session) {
    throw redirect("/landing");
  }

  return await db
    .select({
      id: forms.id,
      title: forms.title,
      status: forms.status,
      createdAt: forms.createdAt,
      responsesCount: sql<number>`count(${responses.id})`.as("responsesCount"),
    })
    .from(forms)
    .leftJoin(responses, eq(responses.formId, forms.id))
    .where(eq(forms.userId, session.user.id))
    .groupBy(forms.id);
}

export const getFormById = cache(async (id: number) => {
  return await db.query.forms.findFirst({ where: eq(forms.id, id) });
});
