"use client";
import { useAccount } from "wagmi";
import { StatsSidebar } from "../common/stats-sidebar";
import { Allocation, useBallot, useIsSavingBallot } from "@/hooks/useBallot";
import { useMemo } from "react";
import { formatNumber, suffixNumber } from "@/lib/utils";

export function BallotSidebar() {
  const { address } = useAccount();
  const { data: ballot, isPending } = useBallot(address);
  const isSavingBallot = useIsSavingBallot();

  const metricPercentages = useMemo(
    () =>
      Object.fromEntries(
        ballot?.allocations.map((a) => [a.metric_id, a.allocation / 100]) ?? []
      ),
    [ballot]
  );

  const projects = useMemo(() => {
    return (ballot?.project_allocations ?? []).map((allocation) => ({
      ...allocation,
      allocation: calculateMetricAllocations(
        allocation.allocations_per_metric ?? []
      ),
    }));

    function calculateMetricAllocations(allocations: Allocation[]) {
      return allocations.reduce(
        (sum, { metric_id, allocation }) =>
          // Multiple OP allocation for metric with % in ballot
          sum + (metricPercentages[metric_id] || 0) * (allocation || 0),
        0
      );
    }
  }, [ballot, metricPercentages]);

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
