"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount, useSignMessage } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { request } from "@/lib/request";
import { ProjectAllocation } from "./useMetrics";
import debounce from "lodash.debounce";
import { useRef } from "react";

export type Ballot = {
  allocations: Allocation[];
  project_allocations: ProjectAllocation[];
  os_multiplier: number;
  os_only: boolean;
};
export type Allocation = {
  metric_id: string;
  allocation: number;
  locked?: boolean;
};

export function useBallot(address?: string) {
  const { toast } = useToast();
  return useQuery({
    enabled: Boolean(address),
    queryKey: ["ballot", { address }],
    queryFn: async () =>
      request
        .get(`${agoraRoundsAPI}/ballots/${address}`)
        .json<Ballot[]>()
        .then((r) => r?.[0] ?? null),
    // .catch(() => {
    //   toast({ variant: "destructive", title: "Error loading ballot" });
    //   return null;
    // }),
  });
}

export function useSaveAllocation() {
  const { toast } = useToast();
  const { address } = useAccount();

  const queryClient = useQueryClient();

  const debounceToast = useRef(
    debounce(
      () => toast({ title: "Your ballot is saved automatically" }),
      2000,
      { leading: true, trailing: false }
    )
  ).current;

  return useMutation({
    mutationKey: ["save-ballot"],
    mutationFn: async (allocation: Allocation) => {
      return request
        .post(`${agoraRoundsAPI}/ballots/${address}/impactMetrics`, {
          json: { ...allocation, metric_id: allocation["metric_id"] },
        })
        .json<Ballot[]>()
        .then((r) => {
          queryClient.setQueryData(["ballot", { address }], r?.[0]);
          return r;
        });
    },
    onSuccess: debounceToast,
    onError: () =>
      toast({ variant: "destructive", title: "Error saving ballot" }),
  });
}

export function useRemoveAllocation() {
  const { toast } = useToast();
  const { address } = useAccount();

  const queryClient = useQueryClient();

  const debounceToast = useRef(
    debounce(
      () => toast({ title: "Your ballot is saved automatically" }),
      2000,
      { leading: true, trailing: false }
    )
  ).current;
  return useMutation({
    mutationKey: ["save-ballot", "remove"],
    mutationFn: async (id: string) => {
      return request
        .delete(`${agoraRoundsAPI}/ballots/${address}/impactMetrics/${id}`)
        .json()
        .then(() => queryClient.invalidateQueries({ queryKey: ["ballot"] }));
    },
    onSuccess: debounceToast,
    onError: () =>
      toast({ variant: "destructive", title: "Error saving ballot" }),
  });
}

export const MAX_MULTIPLIER_VALUE = 3.1;
export function useOsMultiplier() {
  const { toast } = useToast();
  const { address } = useAccount();

  const debouncedCall = useRef(
    debounce(
      (amount: number) =>
        Promise.all([
          request
            .post(
              `${agoraRoundsAPI}/ballots/${address}/osMultiplier/${amount}`,
              {}
            )
            .json(),
          request
            .post(
              `${agoraRoundsAPI}/ballots/${address}/osOnly/${
                amount > MAX_MULTIPLIER_VALUE
              }`,
              {}
            )
            .json(),
        ]),
      2000,
      { leading: true, trailing: false }
    )
  ).current;
  return useMutation({
    mutationFn: async (amount: number) => {
      return debouncedCall(amount);
    },
    onError: () =>
      toast({ variant: "destructive", title: "Error updating multiplier" }),
  });
}

export function useSubmitBallot() {
  const { toast } = useToast();
  const { address } = useAccount();
  const { refetch } = useBallot(address);
  const { signMessage } = useSignMessage();
  return useMutation({
    mutationFn: async () => {
      const { data: ballot } = await refetch();
      const signature = signMessage({ message: JSON.stringify(ballot) });
      return request
        .post(`${agoraRoundsAPI}/ballots/${address}/submit`, {
          json: {
            address,
            ballot_content: {
              allocations: ballot?.allocations.map((alloc) => ({
                metric_id: alloc.metric_id,
                allocation: alloc.allocation,
                locked: alloc.locked,
              })),
              os_only: ballot?.os_only,
              os_multiplier: ballot?.os_multiplier,
            },
            signature,
          },
        })
        .json();
    },
    onSuccess: () => {},
    onError: () =>
      toast({ variant: "destructive", title: "Error updating multiplier" }),
  });
}
