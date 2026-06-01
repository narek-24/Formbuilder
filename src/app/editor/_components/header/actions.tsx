"use client";

import { Book, EllipsisVertical } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import SettingsDialog from "@/components/builder/components/settings-dialog";
import PreviewDialog from "@/components/builder/components/preview-dialog";
import ThemeToggle from "@/components/theme-toggle";
import dynamic from "next/dynamic";

const ActionsPopover = dynamic(() => import("./actions-popover"));

export default function EditorHeaderActions() {
  const isMobile = useMediaQuery("(max-width: 768px)", { defaultValue: false });

  if (isMobile) {
    return (
      <div className="flex items-center gap-1">
        {/* <HelpDialog /> */}
        <Suspense
          fallback={
            <Button size="icon" variant="ghost">
              <EllipsisVertical className="size-5" />
            </Button>
          }
        >
          <ActionsPopover />
        </Suspense>
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 max-md:hidden md:gap-3">
      {/* <HelpDialog /> */}
      <SettingsDialog />
      <PreviewDialog />
      <Button>
        <Book /> Publish
      </Button>
      <ThemeToggle />
    </div>
  );
}
