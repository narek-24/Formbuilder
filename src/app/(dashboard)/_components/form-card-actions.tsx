import { Button } from "@/components/ui/button";
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
  Copy,
  Download,
  Globe,
  MoreHorizontal,
  Share2,
  Trash2,
} from "lucide-react";
import { type getUserForms } from "@/server/queries/forms";

interface Props {
  form: Awaited<ReturnType<typeof getUserForms>>[number];
}

export default function FormCardActions({ form }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
        <MoreHorizontal className="text-muted-foreground" />
        <span className="sr-only">Form actions</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
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

        {form.status === "published" && (
          <DropdownMenuItem>
            <Globe className="mr-2 h-4 w-4" />
            Unpublish Form
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Export Responses (CSV)
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="danger">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Form
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
