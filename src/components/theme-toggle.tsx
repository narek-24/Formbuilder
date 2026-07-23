"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeToggle() {
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
