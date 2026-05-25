import BackButton from "./_components/back-button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen content-center px-4 py-8 lg:col-span-2">
      <BackButton />
      <div className="card mx-auto max-w-lg p-6 lg:p-8">{children}</div>
    </div>
  );
}
