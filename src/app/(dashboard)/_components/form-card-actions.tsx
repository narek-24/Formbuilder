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
import {
  toggleFormStatusAction,
  deleteFormAction,
} from "@/server/actions/forms";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toast } from "@base-ui/react";
import type { GetResponsesType } from "@/app/api/responses/[id]/route";
import { createCSVFile, downLoadCSVFile } from "@/lib/utils/csv";

interface Props {
  id: number;
  status: FormStatusEnum;
  hasReponses: boolean;
}

export default function FormCardActions({ id, status, hasReponses }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);

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
                  <CopyLinkMenuItem id={id} />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}

          <DropdownMenuItem onClick={() => setIsPublishOpen(true)}>
            <Globe className="mr-2 h-4 w-4" />
            {status === "published" ? "Unpublish" : "Publish"} Form
          </DropdownMenuItem>

          {hasReponses && <ExportCSVMenuItem id={id} />}

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

      <AlertDialog open={isPublishOpen} onOpenChange={setIsPublishOpen}>
        <AlertDialogContent>
          <PublishFormDialogContent
            id={id}
            status={status}
            setIsOpen={setIsPublishOpen}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function CopyLinkMenuItem({ id }: { id: number }) {
  const toastManager = Toast.useToastManager();

  async function handleClick() {
    const formUrl = `${window.location.origin}/form/${id}`;

    try {
      await navigator.clipboard.writeText(formUrl);
      toastManager.add({
        title: "Link copied",
        description: "The form link has been copied to your clipboard.",
        timeout: 2000,
      });
    } catch (_) {
      toastManager.add({
        title: "Copy failed",
        description: "Unable to copy the form link. Please try again.",
      });
    }
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
      <Copy className="mr-2 h-4 w-4" />
      Copy Link
    </DropdownMenuItem>
  );
}

function ExportCSVMenuItem({ id }: { id: number }) {
  const toastManager = Toast.useToastManager();

  async function handleCSVDownload() {
    const res = await fetch(`/api/responses/${id}`, { cache: "no-cache" });
    if (!res.ok) throw new Error("Something went wrong");

    const data = (await res.json()) as GetResponsesType;

    const csv = createCSVFile(data);
    downLoadCSVFile(csv, data.fileName);
  }

  function handleClick() {
    toastManager.promise(handleCSVDownload(), {
      loading: "Proccessing data...",
      success: "Success, CSV file is downloaded",
      error: "Something went wrong, cannot export CSV",
    });
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
      <Download className="mr-2 h-4 w-4" />
      Export Responses (CSV)
    </DropdownMenuItem>
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
        <AlertDialogAction variant="danger" onClick={handleClick}>
          {isPending && <Loader2 className="animate-spin" />}
          Delete
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </>
  );
}

function PublishFormDialogContent({
  id,
  status,
  setIsOpen,
}: {
  id: number;
  status: FormStatusEnum;
  setIsOpen: (v: boolean) => void;
}) {
  const { execute, isPending, result } = useAction(toggleFormStatusAction, {
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  function handleClick() {
    if (isPending) return;

    execute({ id });
  }

  const isPublished = status === "published";

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          {isPublished
            ? "This will unpublish the form and you will not be able to collect reponses any more."
            : "This will publish the form and you can now share it again to collect reponses."}
        </AlertDialogDescription>
      </AlertDialogHeader>

      {result.serverError && (
        <Alert variant="danger">
          <AlertCircleIcon />
          <AlertTitle>{result.serverError}</AlertTitle>
        </Alert>
      )}

      <AlertDialogFooter>
        <AlertDialogAction
          variant={isPublished ? "danger" : "default"}
          onClick={handleClick}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {isPublished ? "Unpublish" : "Publish"}
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </>
  );
}
