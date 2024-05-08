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
