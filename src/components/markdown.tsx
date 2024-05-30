import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

const components = {
  a: (p: ComponentProps<"a">) => <a target="_blank" {...p} />,
};

export function Markdown({
  className,
  ...props
}: ComponentProps<typeof ReactMarkdown>) {
  return (
    <ReactMarkdown
      components={components}
      className={cn("prose", className)}
      {...props}
    />
  );
}
