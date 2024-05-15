import { CheckCircle, MessageCircle, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Comments } from "@/components/metrics/comments";
import { MetricPagination } from "@/components/metrics/metric-pagination";
import { MetricDetails } from "@/components/metrics-details";

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

export default function MetricDetailsPage({ params: { id = "" } }) {
  const _id = decodeURIComponent(id);

  return (
    <section>
      <Breadcrumb className="mb-6">
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

      <MetricDetails id={_id} />

      <Comments />
      <MetricPagination id={_id} />
    </section>
  );
}
