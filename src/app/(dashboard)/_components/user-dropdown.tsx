"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { LogOut, UserCircle2 } from "lucide-react";
import { authClient } from "@/server/auth/client";
import { useState } from "react";

export default function UserDropdown() {
  const { data } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!data) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full bg-muted" />
    );
  }

  async function handleSignOut() {
    if (isSigningOut) return;

    try {
      await authClient.signOut();
      location.replace("/landing");
    } catch {
      setIsSigningOut(false);
    }
  }

  const displayName = data.user.name || data.user.email || "Account";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            className="size-10 overflow-hidden rounded-full bg-muted"
          />
        }
      >
        {initials || <UserCircle2 className="size-4" />}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold">{displayName}</p>
          <p className="text-sm text-muted-foreground">{data.user.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          // variant="danger"
          className="justify-start"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
