import { ComponentProps } from "react";
import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <div className="relative w-full">
      <SearchIcon className="size-4 text-muted-foreground absolute top-3 left-3" />
      <Input className={cn("pl-8", className)} {...props} />
    </div>
  );
}
