import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspense, useState } from "react";
import { LayoutPanelTop } from "lucide-react";
import dynamic from "next/dynamic";

const TemplatesContent = dynamic(() => import("./content"));

export default function TemplatesDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <LayoutPanelTop className="size-4" /> Start from a template
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Explore form templates</DialogTitle>
          <DialogDescription>
            Choose a template to get started with your form.
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<p>Loading...</p>}>
          <TemplatesContent setOpen={setOpen} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
