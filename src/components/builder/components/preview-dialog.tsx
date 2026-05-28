"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBuilderStore } from "../hooks/use-builder-store";
import FormRenderer from "../renderer";

export default function PreviewDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" />}>
        <Eye /> Preview
      </DialogTrigger>
      <DialogContent className="flex max-w-3xl flex-col items-center overscroll-contain scroll-smooth px-4 pt-0 pb-6">
        <DialogHeader className="flex w-full items-start justify-between gap-4">
          <div>
            <DialogTitle className="sr-only">Preview</DialogTitle>
            <DialogDescription />
          </div>
        </DialogHeader>

        <div className="mt-4 w-full">
          <Content />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Content() {
  const fields = useBuilderStore((state) => state.fields);
  const settings = useBuilderStore((state) => state.settings);

  if (fields.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center px-8">
        <h3 className="mb-2 text-lg font-semibold">No fields yet</h3>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Add fields to your form to build questions and responses.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="@container mx-auto mb-10 max-w-xl text-center">
        <h1 className="mb-2 text-xl font-bold @xl:text-3xl">
          {settings.title || "Untitled form"}
        </h1>
        {settings.description && (
          <p className="text-sm text-muted-foreground">
            {settings.description}
          </p>
        )}
      </div>

      <FormRenderer
        fields={fields}
        onSubmit={(data: unknown) => alert(JSON.stringify(data))}
      />
    </>
  );
}
