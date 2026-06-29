import { Button } from "@/components/ui/button";
import { FileText, LayoutDashboard, Menu, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export const NAVIGATION = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: FileText,
    label: "Forms",
    href: "/",
  },
] as const;

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 left-0 z-50 mb-5 bg-background">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex flex-row-reverse items-center gap-3 md:flex-row md:gap-8">
          <span className="text-lg font-extrabold">FormBuilder</span>

          <nav className="flex items-center gap-1 max-md:hidden">
            {NAVIGATION.map((link) => (
              <Button
                key={link.label}
                render={<Link href={link.href} />}
                nativeButton={false}
                variant="ghost"
              >
                <link.icon /> {link.label}
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <NavPopover />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Button
            render={<Link href="/editor" />}
            nativeButton={false}
            className="max-md:hidden"
          >
            <Plus />
            New form
          </Button>
          <span>User dropdown</span>
        </div>
      </div>
    </header>
  );
}

function NavPopover() {
  return (
    <Popover modal={false}>
      <PopoverTrigger render={<Button size="icon" variant="ghost" />}>
        <Menu className="size-5" />
        <span className="sr-only">Open navigation</span>
      </PopoverTrigger>
      <PopoverContent className="grid w-40 gap-2 p-2">
        {NAVIGATION.map((link) => (
          <Button
            key={link.label}
            render={<Link href={link.href} />}
            nativeButton={false}
            variant="ghost"
            className="justify-start"
          >
            <link.icon /> {link.label}
          </Button>
        ))}

        <Button render={<Link href="/editor" />} nativeButton={false}>
          <Plus />
          New form
        </Button>
      </PopoverContent>
    </Popover>
  );
}
