import "server-only";
import { getServerSession } from "../auth/config";
import { forms, responses } from "../db/schema";
import { redirect } from "next/navigation";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";

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
