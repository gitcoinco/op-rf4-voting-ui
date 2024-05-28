"use client";
import { PropsWithChildren } from "react";
import { ArrowUpRight, CheckCircle, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/headings";
import { MetricStat, MetricStatProps } from "@/components/metrics/metric-stat";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useMetricById } from "@/hooks/useMetrics";
import { AddToBallotButton } from "../metrics/add-to-ballot-button";
import { Skeleton } from "../ui/skeleton";
import { Markdown } from "../markdown";

export function MetricDetails({ id = "" }) {
  const { data, isPending } = useMetricById(id);
  const { name, description } = data ?? {};

  const badgeholderCount = 150;
  const badgeholderStats = [
    {
      label: "Viewed",
      hint: "?",
      value: `${data?.views} of ${badgeholderCount}`,
      icon: User,
    },
    {
      label: "Added to ballots",
      hint: "?",
      value:
        (((data?.addedToBallots ?? 0) / badgeholderCount) * 100).toFixed(0) +
        "%",
      // value: "90%",
      icon: ({ className = "" }) => (
        <CheckCircle className={cn("text-green-500", className)} />
      ),
    },
    {
      label: "Comments",
      value: data?.comments.length,
      icon: MessageCircle,
    },
  ];
  return (
    <section className="space-y-16">
      <div className="space-y-6">
        {isPending ? (
          <>
            <Skeleton className="w-96 h-8" />
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-4/5 h-4" />
            </div>
          </>
        ) : (
          <>
            <Heading variant="h2">{name}</Heading>
            <Markdown>{description}</Markdown>
          </>
        )}

        <div className="gap-2 items-center flex">
          <AddToBallotButton variant="destructive" id={id} />
          <Button variant="link">
            View calculation <ArrowUpRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>

      <StatsSection label="Badgeholder activity" stats={badgeholderStats} />
    </section>
  );
}

function StatsSection({
  label = "",
  description = "",
  children = null,
  stats = [],
}: PropsWithChildren<{
  label: string;
  description?: string;
  stats: MetricStatProps[];
}>) {
  return (
    <div className="">
      <Heading variant="h3" className="mb-1">
        {label}
      </Heading>
      <Text>{description}</Text>
      <div className="mt-6 flex gap-2">
        {stats.map((stat, i) => (
          <MetricStat className="w-1/3" key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}
