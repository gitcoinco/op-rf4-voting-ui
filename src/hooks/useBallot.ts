"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "../lib/token";
import { request } from "@/lib/request";

export type Allocation = {
  metricId: string;
  allocation: number;
  locked?: boolean;
};

export function useBallot(address?: string) {
  const { toast } = useToast();

  return useQuery({
    enabled: Boolean(address),
    queryKey: ["ballot", address],
    queryFn: async () =>
      request
        .get(`${agoraRoundsAPI}/ballots/${address}`)
        .json<{ allocations: Allocation[] }[]>()
        .then((r) => r?.[0])
        .catch(() => {
          toast({ variant: "destructive", title: "Error loading ballot" });
          return null;
        }),
  });
}

export function useSaveAllocation() {
  const { toast } = useToast();
  const { address } = useAccount();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-ballot"],
    mutationFn: async (allocation: Allocation) => {
      const token = getToken();
      return request
        .post(`${agoraRoundsAPI}/ballots/${address}/impactMetrics`, {
          json: { ...allocation, metric_id: allocation.metricId },
          headers: { Authorization: `Bearer ${token}` },
        })
        .json()
        .then(() => queryClient.invalidateQueries({ queryKey: ["ballot"] }));
    },
    onSuccess: () => toast({ title: "Your ballot is saved automatically" }),
    onError: () =>
      toast({ variant: "destructive", title: "Error saving ballot" }),
  });
}
