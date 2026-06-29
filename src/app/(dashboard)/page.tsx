import { auth } from "@/server/auth/config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw redirect("/landing");
  }

  return <>TODO: Dashboard page, {JSON.stringify(session)} </>;
}
