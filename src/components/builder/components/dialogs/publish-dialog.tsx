"use client";

import Link from "next/link";
import { Book, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createFormAction } from "@/server/actions/forms";
import { useBuilderStore } from "../../hooks/use-builder-store";
import { authClient } from "@/server/auth/client";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PublishDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = authClient.useSession();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button />}>
        <Book /> Publish
      </DialogTrigger>
      <DialogContent>
        {!data ? <UnauthenticatedHeader /> : <Header />}
        {!data ? <UnauthenticatedContent /> : <Content />}
      </DialogContent>
    </Dialog>
  );
}

function UnauthenticatedHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Sign in to publish</DialogTitle>
      <DialogDescription>
        Publishing is only available to signed-in users. Sign in to save and
        manage your forms from the dashboard.
      </DialogDescription>
    </DialogHeader>
  );
}

function Header() {
  return (
    <DialogHeader>
      <DialogTitle>Publish</DialogTitle>
      <DialogDescription>
        Review your form details before publishing.
      </DialogDescription>
    </DialogHeader>
  );
}

function UnauthenticatedContent() {
  return (
    <DialogFooter>
      <Button nativeButton={false} render={<Link href="/login" />}>
        Sign in
      </Button>
      <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
    </DialogFooter>
  );
}

function Content() {
  const router = useRouter();
  const fields = useBuilderStore((state) => state.fields);
  const settings = useBuilderStore((state) => state.settings);
  const reset = useBuilderStore((state) => state.reset);

  const filteredFields = fields.filter((f) => f.isSaved);

  const title = settings.title.trim();
  const hasTitle = title.length > 0;
  const hasFields = filteredFields.length > 0;
  const canPublish = hasFields && hasTitle;

  const { execute, hasErrored, isPending } = useAction(createFormAction, {
    onSuccess: () => {
      setTimeout(() => {
        reset();
      }, 1000);
      router.push("/");
    },
  });

  function handlePublish() {
    if (!canPublish || isPending) return;

    execute({
      title,
      description: settings.description,
      content: JSON.stringify(filteredFields),
    });
  }

  return (
    <>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase">
          Title
        </p>
        <p className="text-sm">
          {hasTitle ? (
            title
          ) : (
            <span className="text-danger-text">Untitled form</span>
          )}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase">
          Description
        </p>
        <p className="text-sm">{settings.description || "No description"}</p>
      </div>

      {!canPublish && (
        <Alert variant="danger">
          <AlertDescription>
            {!hasFields && <p>Add at least one field to publish your form.</p>}
            {!hasTitle && <p>Please add a title to your form.</p>}
          </AlertDescription>
        </Alert>
      )}

      {hasErrored && (
        <Alert variant="danger">
          <AlertTitle>
            Sorry, we were unable to publish your form. Please try again
          </AlertTitle>
        </Alert>
      )}

      <DialogFooter>
        <Button disabled={!canPublish} onClick={handlePublish}>
          {isPending && <Loader2 className="animate-spin" />} Publish
        </Button>
        <DialogClose render={<Button variant="secondary" />}>
          Cancel
        </DialogClose>
      </DialogFooter>
    </>
  );
}
