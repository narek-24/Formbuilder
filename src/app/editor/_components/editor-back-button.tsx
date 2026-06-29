"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/server/auth/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function EditorBackButton() {
  const { data } = authClient.useSession();

  return (
    <Button
      size="icon"
      variant="ghost"
      nativeButton={false}
      render={data?.session ? <Link href="/" /> : <Link href="/landing" />}
    >
      <span className="sr-only">Back</span>
      <MoveLeft />
    </Button>
  );
}
