import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import TitleInput from "./title-input";
import SettingsDialog from "@/components/builder/components/settings-dialog";
import PreviewDialog from "@/components/builder/components/preview-dialog";
import ThemeToggle from "@/components/theme-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PublishDialog from "@/components/builder/components/publish-dialog";
import EditorBackButton from "./editor-back-button";

export default function EditorHeader() {
  return (
    <header className="sticky top-0 left-0 z-50 mb-5 bg-background">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <EditorBackButton />
          <TitleInput />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1 max-md:hidden md:gap-3">
          {/* <HelpDialog /> */}
          <SettingsDialog />
          <PreviewDialog />
          <PublishDialog />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden md:gap-3">
          <Popover modal={false}>
            <PopoverTrigger render={<Button size="icon" variant="ghost" />}>
              <EllipsisVertical className="size-5" />
              <span className="sr-only">Actions</span>
            </PopoverTrigger>
            <PopoverContent className="grid w-40 gap-2 p-2 [&>button]:justify-start">
              <SettingsDialog />
              <PreviewDialog />
              <PublishDialog />
            </PopoverContent>
          </Popover>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
