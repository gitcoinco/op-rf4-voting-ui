import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

export function Markdown({
  className,
  ...props
}: ComponentProps<typeof ReactMarkdown>) {
  return <ReactMarkdown className={cn("prose", className)} {...props} />;
}
