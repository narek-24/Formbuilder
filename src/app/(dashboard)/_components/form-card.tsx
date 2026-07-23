import { Calendar, MessageSquareText } from "lucide-react";
import { type GetUserForms } from "@/server/queries/forms";
import { Badge } from "@/components/ui/badge";
import FormCardActions from "./form-card-actions";

interface Props {
  form: GetUserForms[number];
}

export default function FormCard({ form }: Props) {
  return (
    <div className="card py-4 pr-5 pl-6">
      <div className="flex items-center justify-between gap-1">
        <h2 className="font-semibold">{form.title}</h2>

        <FormCardActions id={form.id} status={form.status} />
      </div>

      <p className="flex items-center gap-1 text-sm text-muted-foreground">
        <Calendar className="size-4" strokeWidth={2} />{" "}
        {form.createdAt.toLocaleDateString()}
      </p>

      <div className="mt-6 flex justify-between">
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
