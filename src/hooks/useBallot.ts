"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { request } from "@/lib/request";

export type Ballot = { allocations: Allocation[] };
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
        .json<Ballot[]>()
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

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-ballot"],
    mutationFn: async (allocation: Allocation) => {
      return request
        .post(`${agoraRoundsAPI}/ballots/${address}/impactMetrics`, {
          json: { ...allocation, metric_id: allocation["metric_id"] },
        })
        .json()
        .then(() => queryClient.invalidateQueries({ queryKey: ["ballot"] }));
    },
    onSuccess: () => toast({ title: "Your ballot is saved automatically" }),
    onError: () =>
      toast({ variant: "destructive", title: "Error saving ballot" }),
  });
}

export function useRemoveAllocation() {
  const { toast } = useToast();
  const { address } = useAccount();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove-allocation"],
    mutationFn: async (id: string) => {
      return request
        .delete(`${agoraRoundsAPI}/ballots/${address}/impactMetrics/${id}`)
        .json()
        .then(() => queryClient.invalidateQueries({ queryKey: ["ballot"] }));
    },
    onSuccess: () => toast({ title: "Your ballot is saved automatically" }),
    onError: () =>
      toast({ variant: "destructive", title: "Error saving ballot" }),
  });
}
