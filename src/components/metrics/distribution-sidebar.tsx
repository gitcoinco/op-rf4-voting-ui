import { StatsSidebar } from "../common/stats-sidebar";

export const projects = [
  {
    label: "Zora",
    avatar: "",
    value: "20%",
  },
  {
    label: "Brownie",
    avatar: "",
    value: "19%",
  },
  {
    label: "Open Ethereum",
    avatar: "",
    value: "15%",
  },
];
export function DistributionSidebar() {
  return (
    <StatsSidebar
      title="Distribution"
      description="For this particular metric"
      projects={projects}
    />
  );
}
