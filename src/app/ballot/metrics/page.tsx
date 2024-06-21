"use client";
import { Suspense, useEffect } from "react";
import { MetricsList } from "../../../components/metrics-list";
import { MetricsFilter } from "@/components/metrics-list/metrics-filter";
import { ReviewBallotToast } from "../../../components/metrics/review-ballot-toast";

export default function MetricsPage() {
  // Suspense needed to build because of useFilter
  // useSearchParams() should be wrapped in a suspense boundary at page "/ballot/metrics".
  return (
    <Suspense>
      <MetricsFilter />
      <MetricsList />
      <ReviewBallotToast />
    </Suspense>
  );
}
