"use client";
import { projects } from "@/data/projects";
import { StatsSidebar } from "../common/stats-sidebar";
import { useMetricById } from "@/hooks/useMetrics";
import { useMemo } from "react";
import { formatNumber } from "@/lib/utils";

export function DistributionSidebar({ id = "" }) {
  const { data } = useMetricById(id);

  console.log("data", data);

  // const projects = useMemo(
  //   () =>
  //     (data?.projectAllocations ?? []).map((project) => ({
  //       label: project.name,
  //       value: formatNumber(Number(project.allocation) * 30_000_000) + " OP",
  //       image: project.image,
  //     })),
  //   [data]
  // );
  return (
    <StatsSidebar
      title="Distribution"
      description="For this particular metric"
      projects={data?.projectAllocations}
    />
  );
}
