"use client";

import { useBuilderStore } from "@/components/builder/hooks/use-builder-store";
import { Input } from "@/components/ui/input";

export default function TitleInput() {
  const title = useBuilderStore((state) => state.settings.title);
  const setTitle = useBuilderStore((state) => state.setTitle);

  return (
    <Input
      id="form-title"
      placeholder="Untitled form"
      className="border-0 bg-transparent text-base lg:w-90"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
