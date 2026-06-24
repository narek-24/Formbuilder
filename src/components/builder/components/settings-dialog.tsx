"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBuilderStore } from "../hooks/use-builder-store";

export default function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" />}>
        <Settings /> Settings
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="md:text-2xl">Settings</DialogTitle>
          <DialogDescription className="mb-6 text-muted-foreground"></DialogDescription>
        </DialogHeader>
        <SettingsForm />
      </DialogContent>
    </Dialog>
  );
}

function SettingsForm() {
  const settings = useBuilderStore((state) => state.settings);
  const setTitle = useBuilderStore((state) => state.setTitle);
  const setDescription = useBuilderStore((state) => state.setDescription);

  return (
    <form className="@container grid gap-8">
      <div className="flex flex-col gap-2 @xl:flex-row @xl:gap-8">
        <div className="shrink-0 @md:w-72">
          <Label htmlFor="title1" className="mb-1">
            Title
          </Label>
          <p id="title-description" className="text-sm text-muted-foreground">
            The main title of your form
          </p>
        </div>
        <Input
          id="title1"
          type="text"
          aria-describedby="title-description"
          placeholder="Enter a title..."
          value={settings.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 @xl:flex-row @xl:gap-8">
        <div className="shrink-0 @md:w-72">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <p id="description-help" className="text-sm text-muted-foreground">
            Give you respondents more information about what this form is about
          </p>
        </div>
        <Textarea
          id="description"
          aria-describedby="description-help"
          placeholder="Enter a description..."
          value={settings.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
}
