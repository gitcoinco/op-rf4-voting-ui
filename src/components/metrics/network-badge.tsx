import { cn } from "@/lib/utils";
import { BadgeProps } from "../ui/badge";

export function NetworkBadge({ children }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center py-1 px-2 bg-gray-100 rounded-full text-xs"
      )}
    >
      <div className="size-[14px] mr-1 bg-red-500 rounded-full" />
      {children}
    </div>
  );
}
