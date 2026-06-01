import { MoveLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import TitleInput from "../title-input";
import EditorHeaderActions from "./actions";

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
        <EditorHeaderActions />
      </div>
    </header>
  );
}
