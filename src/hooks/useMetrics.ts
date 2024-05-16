"use client";
import ky from "ky";

import { useQuery } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

// Mock
import { metrics } from "@/data/metrics";
import { OrderBy, useFilter } from "./useFilter";
import { useBallotContext } from "@/components/ballot/provider";

type SortFields = { [OrderBy.name]: string };
export function useMetrics() {
  const { state } = useBallotContext();
  const [filter] = useFilter();

  function sortFn(a: SortFields, b: SortFields) {
    const dir = { asc: 1, desc: -1 }[filter.sort];
    return a[filter.order].toLocaleLowerCase() >
      b[filter.order].toLocaleLowerCase()
      ? dir
      : -dir;
  }
  return useQuery({
    queryKey: ["metrics", { filter, state }],
    queryFn: async () =>
      metrics
        .map((m, index) => ({ ...m, index }))
        .filter((m) => (filter.inBallot ? state[m.id] : true))
        .filter((m) =>
          m.name.toLocaleLowerCase().includes(filter.search.toLocaleLowerCase())
        )
        .sort(sortFn),
    // ky.get(`${agoraRoundsAPI}/impactMetrics`).json(),
  });
}

export function useMetricById(id: string) {
  return useQuery({
    queryKey: ["metrics", { id }],
    queryFn: async () => metrics.find((m) => m.id === id),
    // ky.get(`${agoraRoundsAPI}/impactMetrics/${id}`).json(),
  });
}

export function useMetricIds() {
  return useQuery({
    queryKey: ["metric-ids"],
    queryFn: async () => metrics.map((m) => m.id),
  });
}
