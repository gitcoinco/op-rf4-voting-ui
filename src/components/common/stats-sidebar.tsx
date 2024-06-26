"use client";
import { PropsWithChildren, ReactNode, useMemo, useRef, useState } from "react";

import { Card } from "../ui/card";
import { Heading } from "../ui/headings";
import { ScrollArea } from "../ui/scroll-area";
import { Text } from "../ui/text";
import DistributionChart from "../metrics/distribution-chart";
import { OpenSourceIcon } from "./opensource-icon";
import { ArrowDown, ChevronRight } from "lucide-react";
import { MetricSort } from "../metrics/metric-sort";
import { Badge } from "../ui/badge";
import AvatarPlaceholder from "../../../public/avatar-placeholder.svg";
import { useIntersection } from "react-use";
import { cn } from "@/lib/utils";
import { Metric, ProjectAllocation } from "@/hooks/useMetrics";

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
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { badgeholderManualUrl } from "@/config";
import { ManualDialog } from "./manual-dialog";

export function StatsSidebar({
  title,
  description,
  isLoading,
  isUpdating,
  projects,
  footer,
  formatAllocation = (v: number) => v,
  formatChartTick = (v: number) => String(v),
}: {
  title: string;
  description?: string;
  isLoading?: boolean;
  isUpdating?: boolean;
  footer?: ReactNode;
  formatAllocation: (alloc: number) => string | number;
  formatChartTick: (alloc: number) => string;
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
      (projects ?? []).toSorted((a, b) =>
        a.allocation < b.allocation ? (sort ? -1 : 1) : -1
      ),
    [projects, sort]
  );

  const chart = useMemo(
    () =>
      (projects ?? [])
        .map((project, i) => ({ x: i, y: project.allocation }))
        .sort((a, b) => (a.y < b.y ? (sort ? -1 : 1) : -1)),
    [projects, sort]
  );

  return (
    <Card
      className={cn("w-[300px] sticky top-4", {
        ["opacity-50 animate-pulse"]: isUpdating,
      })}
    >
      <div className="p-3">
        <Heading variant="h3">{title}</Heading>
        {description && <Text>{description}</Text>}
      </div>
      <div className="p-3 space-y-2">
        <div className="space-y-1">
          <TooltipProvider>
            <Tooltip delayDuration={isLoading ? 0 : 1000000}>
              <TooltipTrigger asChild>
                <div className="border rounded-lg h-32">
                  <DistributionChart
                    data={chart}
                    formatChartTick={formatChartTick}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-[300px] text-center text-xs"
                // align={"center"}
                sideOffset={-60}
              >
                <p>
                  First add metrics to your ballot, then you&apos;ll be able to
                  see your OP allocation
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-end gap-1">
            <MetricSort sort={sort} setSort={setSort} />
          </div>
        </div>
        <ScrollArea className="h-[328px] relative">
          {isLoading &&
            Array(8)
              .fill(0)
              .map((_, i) => (
                <AllocationItem key={i} isLoading>
                  --
                </AllocationItem>
              ))}
          {list.map((item) => (
            <AllocationItem key={item.name} {...item}>
              {formatAllocation(item.allocation)}
            </AllocationItem>
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
function MetricPopover({
  list,
  onOpenManual,
}: {
  list?: Allocation[];
  onOpenManual: () => void;
}) {
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
        iconRight={ChevronRight}
        onClick={onOpenManual}
      >
        This project is open source
      </Button>
    </div>
  );
}

function AllocationItem({
  name,
  image = AvatarPlaceholder.src,
  allocations_per_metric,
  is_os,
  isLoading,
  children,
}: PropsWithChildren<Partial<ProjectAllocation>> & { isLoading?: boolean }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <TooltipProvider
        delayDuration={allocations_per_metric?.length ? 500 : 1000000}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex text-xs items-center justify-between py-2 flex-1 border-b text-muted-foreground">
              <div className="flex gap-2 items-center">
                <div
                  className="size-6 rounded-lg bg-gray-100 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
                <div className="truncate max-w-44">
                  {name || <Skeleton className="h-3 w-16" />}
                </div>
                {is_os && <OpenSourceIcon className="size-3" />}
              </div>
              <div className={cn({ ["text-gray-400"]: isLoading })}>
                {children}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="max-w-[300px]"
            align="end"
            alignOffset={-14}
          >
            <MetricPopover
              list={allocations_per_metric}
              onOpenManual={() => setOpen(true)}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ManualDialog open={isOpen} onOpenChange={setOpen} />
    </>
  );
}
