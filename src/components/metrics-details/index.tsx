"use client";
import { PropsWithChildren } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  MessageCircle,
  PlusIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/headings";
import { MetricStat, MetricStatProps } from "@/components/metrics/metric-stat";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useMetricById } from "@/hooks/useMetrics";
import { AddToBallotButton } from "../metrics/add-to-ballot-button";
import { Skeleton } from "../ui/skeleton";

const badgeholderStats = [
  {
    label: "Viewed",
    hint: "?",
    value: "45 of 150",
    icon: User,
  },
  {
    label: "Added to ballots",
    hint: "?",
    value: "90%",
    icon: ({ className = "" }) => (
      <CheckCircle className={cn("text-green-500", className)} />
    ),
  },
  {
    label: "Comments",
    value: "2",
    icon: MessageCircle,
  },
];

export function MetricDetails({ id = "" }) {
  const { data, isPending } = useMetricById(id);
  const { name, description } = data ?? {};
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
            <Text>{description}</Text>
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

      <div className="">
        <Heading variant="h3" className="mb-4">
          Why it matters
        </Heading>
        <Text>
          Why does this metric matter for the Collective? Uptas assumenda est,
          omnis dolor repellendus. Temporibus autem quibusdam et aut officiis
          debitis aut rerum necessitatibus saepe eveniet. Et harum quidem rerum
          facilis est et expedita distinctio.
        </Text>
        <Text>
          Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus. Itaque earum rerum hic tenetur a sapiente delectus,
          ut aut reiciendis voluptatibus.
        </Text>
      </div>
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
