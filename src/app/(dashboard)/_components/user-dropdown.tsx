"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Laptop, LogOut, Moon, Palette, Sun, UserCircle2 } from "lucide-react";
import { authClient } from "@/server/auth/client";
import { useTheme } from "next-themes";

export default function UserDropdown() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full bg-muted" />
    );
  }

  if (!data) return <ThemeToggle />;

  async function handleSignOut() {
    await authClient.signOut();
    location.replace("/landing");
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
        <ThemeSubmenu />

        <DropdownMenuItem className="justify-start" onClick={handleSignOut}>
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeSubmenu() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Palette /> Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-36">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun /> Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Laptop /> Sytem
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme !== "dark" ? "dark" : "light");
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="size-10 rounded-full"
      onClick={toggleTheme}
    >
      <Sun className="hidden size-5 dark:block" />
      <Moon className="block size-5 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
