"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "../lib/token";
import { request } from "@/lib/request";

export type Allocation = {
  metric_id: string;
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
        .then((r) => r?.[0] ?? null)
        .catch(() => {
          toast({ variant: "destructive", title: "Error loading ballot" });
          return null;
        }),
  });
}

export function useSaveAllocation() {
  const { toast } = useToast();
  const { address } = useAccount();
  const { data: ballot } = useBallot(address);

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-ballot"],
    mutationFn: async (allocation: Allocation) => {
      const inBallot = ballot?.allocations?.find(
        (alloc) => alloc.metric_id === allocation.metric_id
      );

      const apiCall = inBallot
        ? request.delete(
            `${agoraRoundsAPI}/ballots/${address}/impactMetrics/${allocation.metric_id}`
          )
        : request.post(`${agoraRoundsAPI}/ballots/${address}/impactMetrics`, {
            json: { ...allocation, metric_id: allocation["metric_id"] },
          });

      return apiCall
        .json()
        .then(() => queryClient.invalidateQueries({ queryKey: ["ballot"] }));
    },
    onSuccess: () => toast({ title: "Your ballot is saved automatically" }),
    onError: () =>
      toast({ variant: "destructive", title: "Error saving ballot" }),
  });
}
