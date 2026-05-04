import BackButton from "./_components/back-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen content-center px-4 py-8 lg:col-span-2">
      <BackButton />
      <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 lg:p-8 dark:border-2">
        {children}
      </div>
    </div>
  );
}
