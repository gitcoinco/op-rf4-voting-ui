"use client";

import { AddToBallotButton } from "@/components/metrics/add-to-ballot-button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { Metric, useMetrics } from "../../hooks/useMetrics";
import Link from "next/link";
import { useMetricsFilter } from "@/hooks/useFilter";
import { useBallotContext } from "../ballot/provider";
import { Markdown } from "../markdown";
import { ErrorMessage } from "../error-message";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function MetricsList() {
  const [{ excludeBallot }] = useMetricsFilter();
  const { state } = useBallotContext();
  const { data, error, isPending } = useMetrics();

  if (error) return <ErrorMessage error={error} />;

  return (
    <section className="space-y-4">
      {isPending
        ? Array(5)
            .fill(0)
            .map((_, i) => <MetricCard key={i} isLoading />)
        : data
            ?.filter((m) => (excludeBallot ? !state[m["metric_id"]] : true))
            .map((metric, i) => (
              <MetricCard key={metric["metric_id"]} metric={metric} />
            ))}
    </section>
  );
}
function MetricCard({
  metric,
  isLoading,
}: {
  isLoading?: boolean;
  metric?: Metric;
}) {
  return (
    <Card className={cn("p-6", { [""]: isLoading })}>
      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          {isLoading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <Heading variant="h3" asChild className="hover:underline">
              <Link href={`/metrics/${metric?.["metric_id"]}`}>
                {metric?.name}
              </Link>
            </Heading>
          )}
          {isLoading ? (
            <Skeleton className="h-12" />
          ) : (
            <Markdown className={"line-clamp-2 text-gray-700"}>
              {metric?.description}
            </Markdown>
          )}
        </div>
        <AddToBallotButton id={metric?.["metric_id"]} />
      </div>
    </Card>
  );
}
