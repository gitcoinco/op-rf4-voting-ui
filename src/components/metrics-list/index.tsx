"use client";
import { AddToBallotButton } from "@/components/metrics/add-to-ballot-button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { useMetrics } from "../../hooks/useMetrics";
import Link from "next/link";
import { useMetricsFilter } from "@/hooks/useFilter";
import { useBallotContext } from "../ballot/provider";

export function MetricsList() {
  const [{ inBallot }] = useMetricsFilter();
  const { state } = useBallotContext();
  const { data, isPending } = useMetrics();

  return (
    <section className="space-y-4">
      {data
        ?.filter((m) => (inBallot ? state[m.id] : true))
        .map((metric, i) => (
          <Card key={metric.id} className="p-6">
            <div className="flex gap-8">
              <div className="flex-1 space-y-4">
                <Heading variant="h3" asChild className="hover:underline">
                  <Link href={`/metrics/${metric.id}`}>{metric.name}</Link>
                </Heading>
                <Text className="text-gray-700">{metric.description}</Text>
                <Text className="text-sm text-gray-700">Comments: 12</Text>
              </div>
              <div>
                <AddToBallotButton id={metric.id} />
              </div>
            </div>
          </Card>
        ))}
    </section>
  );
}
