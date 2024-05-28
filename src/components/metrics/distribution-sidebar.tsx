"use client";
import { StatsSidebar } from "../common/stats-sidebar";
import { useMetricById } from "@/hooks/useMetrics";

export function DistributionSidebar({ id = "" }) {
  const { data } = useMetricById(id);

  return (
    <StatsSidebar
      title="Distribution"
      description="For this particular metric"
      projects={data?.projectAllocations}
    />
  );
}
