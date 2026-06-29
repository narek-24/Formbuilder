"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/server/auth/client";
import Link from "next/link";

export default function LandingSignInButton() {
  const { data } = authClient.useSession();

  if (!data?.session) {
    return (
      <Button
        variant="secondary"
        className="group h-12 rounded-full px-6 text-lg"
        nativeButton={false}
        render={<Link href="/login" />}
      >
        Sign in
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      className="group h-12 rounded-full px-6 text-lg"
      nativeButton={false}
      render={<Link href="/" />}
    >
      Dashboard
    </Button>
  );
}
