"use client";
import ky from "ky";

import { useQuery } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

// Mock
import { metrics } from "@/data/metrics";

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => metrics.map((m, index) => ({ ...m, index })),
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
