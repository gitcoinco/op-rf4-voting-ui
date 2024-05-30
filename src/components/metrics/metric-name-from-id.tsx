"use client";
import { cn } from "@/lib/utils";
import { useMetricById } from "@/hooks/useMetrics";

export function MetricNameFromId({ id = "" }) {
  const { data, isPending } = useMetricById(id);
  return (
    <span className={cn("truncate", { ["animate-pulse"]: isPending })}>
      {data?.name ?? id}
    </span>
  );
}
