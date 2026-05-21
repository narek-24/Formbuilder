"use client";

import { Book, MoveLeft, Settings } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useBuilderStore } from "@/components/builder/hooks/use-builder-store";
import { Input } from "@/components/ui/input";
import PreviewDialog from "@/components/builder/components/preview-dialog";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

export default function EditorHeader() {
  return (
    <header className="sticky top-0 left-0 z-50 bg-background">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <MoveLeft />
          </Link>
          <TitleInput />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <Settings /> Settings
          </Button>
          <PreviewDialog />
          <Button>
            <Book /> Publish
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function TitleInput() {
  const title = useBuilderStore((state) => state.settings.title);
  const setTitle = useBuilderStore((state) => state.setTitle);

  return (
    <Input
      id="form-title"
      placeholder="Untitled form"
      className="border-0 bg-transparent text-base lg:w-96"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
