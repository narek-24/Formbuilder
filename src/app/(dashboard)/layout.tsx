import ToastProvider from "@/components/ui/toast";
import DashboardHeader from "./_components/dashboard-header";
import { getServerSession } from "@/server/auth/config";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    throw redirect("/landing");
  }

  return (
    <ToastProvider>
      <DashboardHeader />
      <main className="container">{children}</main>
    </ToastProvider>
  );
}
