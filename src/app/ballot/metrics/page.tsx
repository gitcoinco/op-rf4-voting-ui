import { MetricsList } from "../../../components/metrics-list";
import { useFilter } from "@/hooks/useFilter";
import { MetricsFilter } from "@/components/metrics-list/metrics-filter";

export default function MetricsPage() {
  return (
    <>
      <MetricsFilter />
      <MetricsList />
    </>
  );
}
