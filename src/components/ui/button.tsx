import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm font-medium tracking-wide whitespace-nowrap transition-all select-none disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground outline-offset-4 hover:bg-primary-hover",
        secondary:
          "border-2 bg-muted hover:bg-muted-hover aria-expanded:bg-muted-hover",
        ghost: "hover:bg-muted-hover aria-expanded:bg-muted",
        danger:
          "bg-danger text-danger-foreground outline-offset-4 hover:bg-danger-hover",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8.5 gap-1.5 px-4 has-[>svg]:px-3",
        icon: "size-8.5",
        "icon-sm": "size-7 rounded-md",
        "icon-xs": "size-6.5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
