import { Calendar, MessageSquareText, MoreHorizontal } from "lucide-react";
import { type getUserForms } from "@/server/queries/forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  form: Awaited<ReturnType<typeof getUserForms>>[number];
}

export default function FormCard({ form }: Props) {
  return (
    <div className="card py-4 pr-5 pl-6">
      <div className="flex items-center justify-between gap-1">
        <h2 className="font-semibold">{form.title}</h2>

        <Button size="icon" variant="ghost">
          {/* Will later be a dropdown */}
          <MoreHorizontal className="size-5.5" />
        </Button>
      </div>

      <p className="flex items-center gap-1 text-sm text-muted-foreground">
        <Calendar className="size-4" strokeWidth={2} />{" "}
        {form.createdAt.toLocaleDateString()}
      </p>

      <div className="mt-4 flex justify-between border-t pt-4">
        <Badge
          variant={form.status === "published" ? "success" : "danger"}
          className="capitalize"
        >
          {form.status}
        </Badge>

        <p
          title={`${form.responsesCount} responses`}
          className="flex items-center gap-2 pr-2 font-medium"
        >
          {form.responsesCount}{" "}
          <MessageSquareText className="size-4 text-muted-foreground" />
        </p>
      </div>
    </div>
  );
}
