import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-6 text-7xl font-extrabold tracking-widest md:text-9xl">
          404
        </h1>

        <p className="mb-8 text-xl md:text-3xl">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link href="/" className={cn(buttonVariants(), "h-11 px-6! text-lg")}>
          <Home className="mr-2 size-5.5" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
