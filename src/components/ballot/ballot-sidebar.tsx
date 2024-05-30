"use client";
import { useAccount } from "wagmi";
import { StatsSidebar } from "../common/stats-sidebar";
import { useBallot } from "@/hooks/useBallot";

export function BallotSidebar() {
  const { address } = useAccount();
  const { data: ballot } = useBallot(address);

  return (
    <StatsSidebar
      title="OP Allocation"
      projects={ballot?.project_allocations}
      footer={
        <div className="text-xs p-2 text-muted-foreground">
          If all badgeholders voted like you, this would be the Round 4
          allocation.
        </div>
      }
    />
  );
}
