import { Book, EllipsisVertical } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SettingsDialog from "@/components/builder/components/settings-dialog";
import PreviewDialog from "@/components/builder/components/preview-dialog";

export default function ActionsPopover() {
  return (
    <Popover modal={false}>
      <PopoverTrigger
        className={buttonVariants({ size: "icon", variant: "ghost" })}
      >
        <EllipsisVertical className="size-5" />
        <span className="sr-only">Actions</span>
      </PopoverTrigger>
      <PopoverContent className="grid w-40 gap-2 p-2 [&>button]:justify-start">
        <SettingsDialog />
        <PreviewDialog />
        <Button>
          <Book /> Publish
        </Button>
      </PopoverContent>
    </Popover>
  );
}
