"use client";
import ky from "ky";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";
import { type Address } from "viem";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "../lib/token";

export type Allocation = {
  metricId: string;
  allocation: number;
  locked?: boolean;
};

let mockBallot = {
  ballotId: 0,
  roundId: "4",
  status: "PENDING",
  allocations: [],
  ballotCasterAddress: "0x277D95C4646827Ea5996E998B31704C0964F79b1",
};
export function useBallot() {
  const { address } = useAccount();
  return useQuery({
    enabled: Boolean(address),
    queryKey: ["ballot", { address }],
    queryFn: async () => {
      // return mockBallot;
      return ky.get(`${agoraRoundsAPI}/ballots/${address}`).json<{
        allocations: Allocation[];
      }>();
    },
  });
}

export function useSaveAllocation() {
  const { toast } = useToast();
  const { address } = useAccount();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-ballot"],
    mutationFn: async (allocation: Allocation) => {
      return saveAllocation(allocation, address).then(() =>
        queryClient.invalidateQueries({ queryKey: ["ballot"] })
      );
    },
    onSuccess: () => toast({ title: "Ballot saved" }),
  });
}

async function saveAllocation(allocation: Allocation, address?: Address) {
  console.log("save ballot", allocation);
  // return new Promise((r) =>
  //   setTimeout(() => {
  //     (mockBallot.allocations as Allocation[]) = (
  //       mockBallot.allocations as Allocation[]
  //     ).map((a) =>
  //       a.metricId === allocation.metricId ? allocation : { ...a }
  //     );
  //     r({});
  //   }, 1000)
  // );
  const token = getToken();

  return ky
    .post(`/api/agora/ballots/${address}/impactMetrics`, {
      json: allocation,
      headers: { Authorization: `Bearer ${token}` },
    })
    .json();
}
