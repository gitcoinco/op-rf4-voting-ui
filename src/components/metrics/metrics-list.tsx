"use client";
import { AddToBallotButton } from "@/components/metrics/add-to-ballot-button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { metrics } from "@/data/metrics";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import ky from "ky";

function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () =>
      ky.get("/api/agora/retrofunding/rounds/4/impactMetrics").json(),
  });
}

export function MetricsList() {
  const { data, isPending } = useMetrics();

  console.log(data);
  return (
    <section className="space-y-4">
      {metrics.map((metric, i) => (
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
              <AddToBallotButton metricId={metric.id} isAdded={i === 0} />
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}
