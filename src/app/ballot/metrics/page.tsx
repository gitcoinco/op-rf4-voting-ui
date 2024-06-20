"use client";
import { Suspense, useEffect } from "react";
import { MetricsList } from "../../../components/metrics-list";
import { MetricsFilter } from "@/components/metrics-list/metrics-filter";
import { ReviewBallotToast } from "../../../components/metrics/review-ballot-toast";
import mixpanel from "@/lib/mixpanel";

export default function MetricsPage() {
  useEffect(() => {
    mixpanel.track_pageview();
  }, []);
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
