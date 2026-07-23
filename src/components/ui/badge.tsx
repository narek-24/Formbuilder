import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border text-xs font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        muted: "bg-muted text-foreground",
        success:
          "border-indigo-500/10 bg-indigo-500/8 text-indigo-900 dark:text-indigo-300",
        danger: "border-red-500/10 bg-red-500/8 text-red-900 dark:text-red-400",
        warning:
          "border-amber-500/10 bg-amber-500/8 text-amber-900 dark:text-amber-200",
      },
      size: {
        default: "px-3 py-1",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & BadgeVariants & { asChild?: boolean }) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
