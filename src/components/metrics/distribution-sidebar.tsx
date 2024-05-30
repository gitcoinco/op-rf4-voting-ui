"use client";
import { useMemo } from "react";
import { StatsSidebar } from "../common/stats-sidebar";
import { useMetricById } from "@/hooks/useMetrics";

export function DistributionSidebar({ id = "" }) {
  const { data } = useMetricById(id);

  const projects = useMemo(
    () =>
      (data?.allocations_per_project ?? []).map((a) => ({
        ...a,
        allocation: String(Number(a.allocation ?? 0) * 10_000_000),
      })),
    [data]
  );
  return (
    <StatsSidebar
      title="Distribution"
      description="For this particular metric"
      projects={projects}
    />
  );
}
