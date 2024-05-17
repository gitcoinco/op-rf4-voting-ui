import { projects } from "@/data/projects";
import { StatsSidebar } from "../common/stats-sidebar";

export function BallotSidebar() {
  return (
    <StatsSidebar
      title="OP Allocation"
      projects={projects}
      footer={
        <div className="text-xs p-2 text-muted-foreground">
          If all badgeholders voted like you, this would be the Round 4
          allocation.
        </div>
      }
    />
  );
}
