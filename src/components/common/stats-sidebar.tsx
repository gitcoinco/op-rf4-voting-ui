"use client";
import { ReactNode, useRef } from "react";

import { Card } from "../ui/card";
import { Heading } from "../ui/headings";
import { ScrollArea } from "../ui/scroll-area";
import { Text } from "../ui/text";
import DistributionChart from "../metrics/distribution-chart";
import { OpenSourceIcon } from "./opensource-icon";
import { ArrowDown } from "lucide-react";
import { MetricDropdown } from "../metrics/metric-dropdown";
import { MetricSort } from "../metrics/metric-sort";
import { Badge } from "../ui/badge";

import { useIntersection } from "react-use";

export function StatsSidebar({
  title,
  description,
  projects,
  footer,
}: {
  title: string;
  description?: string;
  footer?: ReactNode;
  projects: ListItem[];
}) {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  return (
    <Card className="w-[300px]">
      <div className="p-3">
        <Heading variant="h3">{title}</Heading>
        {description && <Text>{description}</Text>}
      </div>
      <div className="p-3 space-y-2">
        <div className="space-y-1">
          <div className="border rounded-lg h-32">
            <DistributionChart />
          </div>
          <div className="flex gap-1">
            <MetricDropdown />
            <MetricSort />
          </div>
        </div>
        <ScrollArea className="h-80 relative">
          <List
            items={projects}
            renderItem={({ label, value, isOpenSource }) => (
              <div
                key={label}
                className="flex text-xs items-center justify-between py-2 flex-1 border-b text-muted-foreground"
              >
                <div className="flex gap-2 items-center">
                  <div className="size-6 rounded-lg  bg-gray-100" />
                  <div className="">{label}</div>
                  {isOpenSource && <OpenSourceIcon className="size-3" />}
                </div>
                <div className="">{value}</div>
              </div>
            )}
          />
          <div ref={intersectionRef} />
          {(intersection?.intersectionRatio ?? 0) < 1 && (
            <Badge
              variant="outline"
              className="animate-in fade-in zoom-in absolute bottom-2 left-1/2 -translate-x-1/2 bg-white"
            >
              More <ArrowDown className="ml-2 size-3 " />
            </Badge>
          )}
        </ScrollArea>

        {footer}
      </div>
    </Card>
  );
}

type ListItem = { label: string; value: string } & { isOpenSource?: boolean };
function List({
  items,
  renderItem,
}: {
  items: ListItem[];
  renderItem: (item: ListItem) => ReactNode;
}) {
  return <ul>{items.map((item) => renderItem(item))}</ul>;
}
