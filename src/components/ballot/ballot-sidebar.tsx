"use client";
import { useAccount } from "wagmi";
import { StatsSidebar } from "../common/stats-sidebar";
import { useBallot } from "@/hooks/useBallot";
import { MetricDropdown } from "../metrics/metric-dropdown";
import { useMemo, useState } from "react";

export function BallotSidebar() {
  const { address } = useAccount();
  const [filter, setFilter] = useState("");
  const { data: ballot } = useBallot(address);

  const categories = useMemo(
    () =>
      // Create an array of all unique metric ids
      Object.keys(
        Object.fromEntries(
          ballot?.project_allocations
            .flatMap((a) => a.allocations_per_metric?.map((m) => m.metric_id))
            .map((id) => [id, id]) ?? []
        )
      ),
    [ballot]
  );

  const projects = useMemo(
    () =>
      ballot?.project_allocations.filter((a) =>
        a.allocations_per_metric?.map((m) => m.metric_id).includes(filter)
      ) ?? [],
    [ballot, filter]
  );

  return (
    <StatsSidebar
      title="OP Allocation"
      projects={projects}
      filter={
        <MetricDropdown
          categories={categories}
          filter={filter}
          onChange={setFilter}
        />
      }
      footer={
        <div className="text-xs p-2 text-muted-foreground">
          If all badgeholders voted like you, this would be the Round 4
          allocation.
        </div>
      }
    />
  );
}
