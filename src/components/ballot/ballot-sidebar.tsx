"use client";
import { useAccount } from "wagmi";
import { StatsSidebar } from "../common/stats-sidebar";
import { useBallot, useIsSavingBallot } from "@/hooks/useBallot";
import { useMemo, useState } from "react";
import { formatNumber, suffixNumber } from "@/lib/utils";

export function BallotSidebar() {
  const { address } = useAccount();
  const [filter, setFilter] = useState("");
  const { data: ballot, isPending } = useBallot(address);
  const isSavingBallot = useIsSavingBallot();

  const metricPercentages = useMemo(
    () =>
      Object.fromEntries(
        ballot?.allocations.map((a) => [a.metric_id, a.allocation / 100]) ?? []
      ),
    [ballot]
  );

  const projects = useMemo(
    () =>
      (filter
        ? ballot?.project_allocations.filter((a) =>
            a.allocations_per_metric?.map((m) => m.metric_id).includes(filter)
          ) ?? []
        : ballot?.project_allocations ?? []
      ).map((a) => ({
        ...a,
        allocation:
          a.allocations_per_metric?.reduce(
            (sum, x) =>
              sum + (metricPercentages[x.metric_id] || 0) * (x.allocation || 0),
            0
          ) ?? 0,
      })),
    [ballot, filter, metricPercentages]
  );

  return (
    <StatsSidebar
      isUpdating={isSavingBallot}
      isLoading={isPending || !projects.length}
      title="OP Allocation"
      projects={projects}
      formatChartTick={suffixNumber}
      formatAllocation={(alloc) => formatNumber(alloc) + " OP"}
      footer={
        <div className="text-xs p-2 text-muted-foreground">
          If all badgeholders voted like you, this would be the Round 4
          allocation.
        </div>
      }
    />
  );
}
