import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md text-xs font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        muted: "bg-muted text-foreground",
        success: "bg-teal-500/8 text-teal-900 dark:text-teal-200",
        danger: "bg-rose-500/8 text-rose-900 dark:text-rose-300",
        warning: "bg-amber-500/8 text-amber-900 dark:text-amber-200",
      },
      size: {
        default: "px-3 py-0.75",
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
