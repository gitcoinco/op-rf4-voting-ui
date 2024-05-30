"use client";
import { ReactNode, useMemo, useRef, useState } from "react";

import { Card } from "../ui/card";
import { Heading } from "../ui/headings";
import { ScrollArea } from "../ui/scroll-area";
import { Text } from "../ui/text";
import DistributionChart from "../metrics/distribution-chart";
import { OpenSourceIcon } from "./opensource-icon";
import { ArrowDown, ChevronRight } from "lucide-react";
import { MetricSort } from "../metrics/metric-sort";
import { Badge } from "../ui/badge";

import { useIntersection } from "react-use";
import { formatNumber } from "@/lib/utils";
import { Metric } from "@/hooks/useMetrics";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Allocation } from "@/hooks/useBallot";
import { MetricNameFromId } from "../metrics/metric-name-from-id";

export function StatsSidebar({
  title,
  description,
  filter,
  projects,
  footer,
}: {
  title: string;
  description?: string;
  filter?: ReactNode;
  footer?: ReactNode;
  projects: Metric["allocations_per_project"];
}) {
  const [sort, setSort] = useState(false);

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const list = useMemo(
    () =>
      (projects ?? [])
        .map((project) => ({
          label: project.name,
          value: formatNumber(Number(project.allocation)) + " OP",
          image: project.image,
          allocations_per_metric: project.allocations_per_metric?.toSorted(
            (a, b) => (a.allocation < b.allocation ? 1 : -1)
          ),
        }))
        .sort((a, b) =>
          a.value.localeCompare(b.value) ? (sort ? -1 : 1) : -1
        ),
    [projects, sort]
  );

  const chart = useMemo(
    () =>
      (projects ?? [])
        .map((project, i) => ({
          x: i,
          y: Number(project.allocation) / 10_000_000,
        }))
        .sort((a, b) => (a.y < b.y ? (sort ? -1 : 1) : -1)),
    [projects, sort]
  );

  return (
    <Card className="w-[300px]">
      <div className="p-3">
        <Heading variant="h3">{title}</Heading>
        {description && <Text>{description}</Text>}
      </div>
      <div className="p-3 space-y-2">
        <div className="space-y-1">
          <div className="border rounded-lg h-32">
            <DistributionChart data={chart} />
          </div>
          <div className="flex gap-1">
            {filter}
            <MetricSort sort={sort} setSort={setSort} />
          </div>
        </div>
        <ScrollArea className="h-80 relative">
          {list.map(({ label, value, image, allocations_per_metric }) => (
            <div
              key={label}
              className="flex text-xs items-center justify-between py-2 flex-1 border-b text-muted-foreground"
            >
              <div className="flex gap-2 items-center">
                <div
                  className="size-6 rounded-lg  bg-gray-100 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
                <div className="">{label}</div>
                {true && <OpenSourceIcon className="size-3" />}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="">{value}</div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-[300px]"
                    align="end"
                    alignOffset={-14}
                  >
                    <MetricPopover list={allocations_per_metric} />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
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
function MetricPopover({ list }: { list?: Allocation[] }) {
  if (!list?.length) return null;
  return (
    <div className="text-xs">
      <h3 className="font-semibold text-muted-foreground p-1">
        Top ranked from your ballot
      </h3>
      <ol>
        {list?.map((m, i) => (
          <li key={m.metric_id} className="flex gap-2 p-2">
            <div>{i + 1}.</div>
            <MetricNameFromId id={m.metric_id} />
          </li>
        ))}
      </ol>
      <Separator className="-mx-3 mb-2" />
      <Button
        icon={OpenSourceIcon}
        variant={"ghost"}
        size="sm"
        onClick={() => alert("where does this link?")}
        iconRight={ChevronRight}
      >
        This project is open source
      </Button>
    </div>
  );
}
