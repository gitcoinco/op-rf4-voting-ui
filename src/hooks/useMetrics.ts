"use client";
import ky from "ky";

import { useQuery } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { OrderBy, SortOrder, useMetricsFilter } from "./useFilter";

type SortFields = { [OrderBy.name]?: string; [OrderBy.allocation]?: number };

export type Metric = {
  metricId: string;
  name: string;
  description: string;
  commentsCount: number;
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
      return ky.get(`${agoraRoundsAPI}/impactMetrics`).json<Metric[]>();
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
    // queryFn: async () => metrics.find((m) => m.id === id),
    queryFn: async () =>
      ky.get(`${agoraRoundsAPI}/impactMetrics/${id}`).json<Metric>(),
  });
}

export function useMetricIds() {
  const { data } = useMetrics();
  return useQuery({
    queryKey: ["metric-ids", { data }],
    queryFn: async () => data?.map((m) => m.metricId) ?? [],
  });
}
