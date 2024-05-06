import { projects } from "@/data/projects";
import { StatsSidebar } from "../common/stats-sidebar";

export function AllocationSidebar() {
  return <StatsSidebar title="OP Allocation" projects={projects} />;
}
