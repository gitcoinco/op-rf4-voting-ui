"use client";
import { useAccount } from "wagmi";
import { StatsSidebar } from "../common/stats-sidebar";
import { useBallot, useIsSavingBallot } from "@/hooks/useBallot";
import { formatNumber, suffixNumber } from "@/lib/utils";

export function BallotSidebar() {
  const { address } = useAccount();
  const { data: ballot, isPending } = useBallot(address);
  const isSavingBallot = useIsSavingBallot();

  const projects = ballot?.project_allocations ?? [];

  return (
    <StatsSidebar
      isUpdating={isSavingBallot}
      isLoading={isPending || !projects.length}
      title="OP Allocation"
      projects={ballot?.project_allocations ?? []}
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
