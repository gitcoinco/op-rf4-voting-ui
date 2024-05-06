import { PropsWithChildren } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  MessageCircle,
  PlusIcon,
  User,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/common/button";
import { Heading } from "@/components/ui/headings";
import { MetricStat, MetricStatProps } from "@/components/metrics/metric-stat";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Comments } from "@/components/metrics/comments";

export default function MetricDetailsPage() {
  return (
    <section className="space-y-16">
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/ballot">Ballot</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/ballot/metrics">Metrics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Metric Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Heading variant="h2">Interactions from Trusted Optimism Users</Heading>

        <Text>
          This metric measures how many Optimism users with a high trust score
          have interacted with a project. The high trust score is calculated by
          the average number of monthly active users a project has had over the
          last 3 months, filtered by users with a Farcaster account and a
          Gitcoin Passport score of at least 20.
        </Text>

        <div className="gap-2 items-center flex">
          <Button icon={PlusIcon} variant="destructive">
            Add to ballot
          </Button>
          <Button variant="link">
            View calculation <ArrowUpRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>

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

      <Comments />
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
          <MetricStat className="w-1/4" key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}
