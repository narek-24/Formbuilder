"use client";

import type { FormStatusEnum } from "@/server/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AlertCircleIcon,
  Copy,
  Download,
  Globe,
  Loader2,
  MoreHorizontal,
  Share2,
  Trash2,
} from "lucide-react";
import { cancelFormAction, deleteFormAction } from "@/server/actions/forms";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  id: number;
  status: FormStatusEnum;
}

export default function FormCardActions({ id, status }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <MoreHorizontal className="text-muted-foreground" />
          <span className="sr-only">Form actions</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          {status === "published" && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Share2 className="mr-2 h-4 w-4" />
                Share Form
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-44">
                  <DropdownMenuItem>Facebook</DropdownMenuItem>
                  <DropdownMenuItem>X (Twitter)</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}

          {status === "published" && (
            <DropdownMenuItem onClick={() => setIsCancelOpen(true)}>
              <Globe className="mr-2 h-4 w-4" />
              Unpublish Form
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            Export Responses (CSV)
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="danger"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Form
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <DeleteFormDialogContent id={id} />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <AlertDialogContent>
          <CencelFormDialogContent id={id} setIsOpen={setIsCancelOpen} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function DeleteFormDialogContent({ id }: { id: number }) {
  const { execute, isPending, result } = useAction(deleteFormAction);

  function handleClick() {
    if (isPending) return;

    execute({ id });
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the form
          and all the responses from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>

      {result.serverError && (
        <Alert variant="danger">
          <AlertCircleIcon />
          <AlertTitle>{result.serverError}</AlertTitle>
        </Alert>
      )}

      <AlertDialogFooter>
        <AlertDialogAction onClick={handleClick}>
          {isPending && <Loader2 className="animate-spin" />}
          Delete
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </>
  );
}

function CencelFormDialogContent({
  id,
  setIsOpen,
}: {
  id: number;
  setIsOpen: (v: boolean) => void;
}) {
  const { execute, isPending, result } = useAction(cancelFormAction, {
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  function handleClick() {
    if (isPending) return;

    execute({ id });
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will unpublish the form and you will not be able to collect
          responses any more.
        </AlertDialogDescription>
      </AlertDialogHeader>

      {result.serverError && (
        <Alert variant="danger">
          <AlertCircleIcon />
          <AlertTitle>{result.serverError}</AlertTitle>
        </Alert>
      )}

      <AlertDialogFooter>
        <AlertDialogAction onClick={handleClick}>
          {isPending && <Loader2 className="animate-spin" />}
          Unpublish
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </>
  );
}
