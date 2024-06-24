"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Comments } from "@/components/comments/comments";
import { MetricPagination } from "@/components/metrics/metric-pagination";
import { MetricDetails } from "@/components/metrics-details";
import { DistributionSidebar } from "@/components/metrics/distribution-sidebar";
import Link from "next/link";
import { useMetricById, useViewMetric } from "@/hooks/useMetrics";
import { PageView } from "@/components/common/page-view";

export default function MetricDetailsPage({ params: { id = "" } }) {
  useViewMetric(id);
  const metric = useMetricById(id);
  return (
    <>
      <section className="flex-1 space-y-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/ballot">Ballot</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/ballot/metrics">Metrics</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Metric Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <MetricDetails {...metric} />
        {metric.data?.name && <PageView title={metric.data?.name} />}
        <Comments />
        <MetricPagination id={id} />
      </section>
      <aside>
        <DistributionSidebar id={id} />
      </aside>
    </>
  );
}
