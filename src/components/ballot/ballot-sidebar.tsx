"use client";
import { StatsSidebar } from "../common/stats-sidebar";
import { useBallot } from "@/hooks/useBallot";

export function BallotSidebar() {
  const { data: ballot, error } = useBallot();

  console.log(ballot, error);
  return (
    <StatsSidebar
      title="OP Allocation"
      projects={[]}
      footer={
        <div className="text-xs p-2 text-muted-foreground">
          If all badgeholders voted like you, this would be the Round 4
          allocation.
        </div>
      }
    />
  );
}
