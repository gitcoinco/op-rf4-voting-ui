import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-semibold", {
  variants: {
    variant: {
      h1: "",
      h2: "text-2xl",
      h3: "text-lg",
    },
  },
  defaultVariants: {
    variant: "h3",
  },
});

export interface HeadingProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
