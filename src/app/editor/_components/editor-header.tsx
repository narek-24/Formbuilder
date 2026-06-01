import { Book, MoveLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import PreviewDialog from "@/components/builder/components/preview-dialog";
import ThemeToggle from "@/components/theme-toggle";
import TitleInput from "./title-input";
import Link from "next/link";
import SettingsDialog from "@/components/builder/components/settings-dialog";

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
          <SettingsDialog />
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
