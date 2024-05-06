import { projects } from "@/data/projects";
import { StatsSidebar } from "../common/stats-sidebar";

export function DistributionSidebar() {
  return (
    <StatsSidebar
      title="Distribution"
      description="For this particular metric"
      projects={projects}
    />
  );
}
