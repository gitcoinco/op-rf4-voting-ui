import { StatsSidebar } from "../common/stats-sidebar";
import { NetworkBadge } from "./network-badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
      footer={
        <ScrollArea className="whitespace-nowrap">
          <NetworkBadge>OP Mainnet</NetworkBadge>
          <NetworkBadge>Base</NetworkBadge>
          <NetworkBadge>Zora</NetworkBadge>
          <NetworkBadge>Mode</NetworkBadge>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      }
    />
  );
}
