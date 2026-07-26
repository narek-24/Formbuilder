"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-danger/10 text-danger-text">
          <AlertTriangle className="size-8" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>

        <p className="mt-3 text-muted-foreground">
          We couldn&apos;t load this page. Please try again.
        </p>

        <Button onClick={unstable_retry} className="mt-8">
          <RefreshCw className="mr-2 size-4" />
          Try again
        </Button>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-6 text-xs break-all text-muted-foreground">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
