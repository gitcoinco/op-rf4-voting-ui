"use client";
import ky from "ky";

import { useQuery } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";

type Allocation = { metricId: string; allocation: number };
export function useBallot() {
  const { address } = useAccount();
  return useQuery({
    enabled: Boolean(address),
    queryKey: ["ballot", { address }],
    queryFn: async () => {
      return ky.get(`${agoraRoundsAPI}/ballots/${address}`).json<{
        allocations: Allocation[];
      }>();
    },
  });
}
