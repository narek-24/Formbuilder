import { Book, Eye, MoveLeft, Settings } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
          <Input
            id="form-title"
            placeholder="Untitled form"
            className="border-0 bg-transparent text-base"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <Settings /> Settings
          </Button>
          <Button variant="ghost">
            <Eye /> Preview
          </Button>
          <Button>
            <Book /> Publish
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
