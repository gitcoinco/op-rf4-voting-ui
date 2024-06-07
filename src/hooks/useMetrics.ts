"use client";

import { useQuery } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { OrderBy, SortOrder, useMetricsFilter } from "./useFilter";
import { request } from "@/lib/request";
import { useAccount } from "wagmi";
import { Allocation } from "./useBallot";

type SortFields = { [OrderBy.name]?: string; [OrderBy.allocation]?: number };

export type ProjectAllocation = {
  allocation: number;
  image: string;
  name: string;
  project_id: string;
  allocations_per_metric?: Allocation[];
};
export type Metric = {
  metric_id: string;
  name: string;
  url: string;
  description: string;
  comments: [];
  commentsCount: number;
  views: number;
  addedToBallots: number;
  allocations_per_project?: ProjectAllocation[];
};

export function createSortFn(filter: { order: OrderBy; sort: SortOrder }) {
  return function sortFn(a?: SortFields, b?: SortFields) {
    const dir = { asc: 1, desc: -1 }[filter.sort];
    return (a?.[filter.order] ?? 0) > (b?.[filter.order] ?? 0) ? dir : -dir;
  };
}

export function useMetrics() {
  const [filter] = useMetricsFilter();

  const query = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      return request.get(`${agoraRoundsAPI}/impactMetrics`).json<Metric[]>();
    },
  });

  return {
    ...query,
    data: (query.data ?? [])
      .map((m, index) => ({ ...m, index }))
      .filter((m) =>
        m.name.toLocaleLowerCase().includes(filter.search.toLocaleLowerCase())
      )
      .sort(createSortFn(filter)),
  };
}

export function useMetricById(id: string) {
  return useQuery({
    queryKey: ["metrics", { id }],
    queryFn: async () =>
      request.get(`${agoraRoundsAPI}/impactMetrics/${id}`).json<Metric>(),
  });
}

export function useMetricIds() {
  const { data } = useMetrics();
  return useQuery({
    queryKey: ["metric-ids", { data }],
    queryFn: async () => data?.map((m) => m["metric_id"]) ?? [],
  });
}

const viewedMetrics = new Set();
export function useViewMetric(metricId: string) {
  const { address } = useAccount();
  return useQuery({
    enabled: Boolean(!viewedMetrics.has(metricId) && address),
    queryKey: ["viewed-metrics", metricId],
    queryFn: () =>
      request
        .post(`${agoraRoundsAPI}/impactMetrics/${metricId}/${address}`)
        .then((r) => {
          viewedMetrics.add(metricId);
          return null;
        }),
  });
}
