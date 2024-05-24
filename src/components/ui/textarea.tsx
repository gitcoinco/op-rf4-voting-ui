import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const form = useFormContext();

    const length = React.useMemo(
      () => form.watch(props.name)?.length ?? 0,
      [form, props.name]
    );
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {props.maxLength && (
          <div className="absolute text-gray-500 left-2 bottom-2 text-xs">
            {length} / {props.maxLength}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
