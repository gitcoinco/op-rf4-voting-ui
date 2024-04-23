import { CircleHelp } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type MetricStatProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: any;
};
export function MetricStat({
  className,
  label,
  value,
  hint,
  icon: Icon,
}: MetricStatProps & ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl bg-gray-100 text-gray-700 px-4 py-4 inline-flex gap-1 flex-col transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
    >
      <div className={cn("text-sm inline-flex items-center font-medium")}>
        {label}
        {hint && <CircleHelp className="ml-2 size-4" />}
      </div>
      <div className={cn("text-sm inline-flex items-center")}>
        {Icon && <Icon className="mr-1 size-4" />}
        {value}
      </div>
    </div>
  );
}
