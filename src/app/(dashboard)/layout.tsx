import DashboardHeader from "./_components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main className="container pt-4 pb-9">{children}</main>
    </>
  );
}
