import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-6 text-6xl font-extrabold md:text-8xl">404</h1>

        <p className="mb-8 text-xl font-medium">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Button render={<Link href="/" />} nativeButton={false}>
          <Home className="size-5" /> Back to Home
        </Button>
      </div>
    </div>
  );
}
