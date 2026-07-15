"use client";

import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PublishDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <Book /> Publish
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Publish</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Content />
      </DialogContent>
    </Dialog>
  );
}

function Content() {
  return <div>TODO: Publish</div>;
}
