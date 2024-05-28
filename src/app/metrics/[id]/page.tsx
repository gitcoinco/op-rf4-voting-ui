import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Comments } from "@/components/metrics/comments";
import { MetricPagination } from "@/components/metrics/metric-pagination";
import { MetricDetails } from "@/components/metrics-details";
import { DistributionSidebar } from "@/components/metrics/distribution-sidebar";
import Link from "next/link";

export default function MetricDetailsPage({ params: { id = "" } }) {
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

        <MetricDetails id={id} />

        <Comments />
        <MetricPagination id={id} />
      </section>
      <aside>
        <DistributionSidebar id={id} />
      </aside>
    </>
  );
}
