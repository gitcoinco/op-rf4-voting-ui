"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";
import { type Address } from "viem";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "../lib/token";
import { request } from "@/lib/request";

export type Allocation = {
  metricId: string;
  allocation: number;
  locked?: boolean;
};

let mockBallot = {
  ballotId: 0,
  roundId: "4",
  status: "PENDING",
  allocations: [
    {
      metricId: "trusted_daily_active_users",
      allocation: 0,
    },
  ],
  ballotCasterAddress: "0x277D95C4646827Ea5996E998B31704C0964F79b1",
};
export function useBallot(address?: string) {
  return useQuery({
    enabled: Boolean(address),
    queryKey: ["ballot", { address }],
    queryFn: async () => {
      // return mockBallot;
      return request.get(`${agoraRoundsAPI}/ballots/${address}`).json<{
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
    onSuccess: () => toast({ title: "Your ballot is saved automatically" }),
  });
}

async function saveAllocation(allocation: Allocation, address?: Address) {
  const token = getToken();

  return request
    .post(`${agoraRoundsAPI}/ballots/${address}/impactMetrics`, {
      json: allocation,
      headers: { Authorization: `Bearer ${token}` },
    })
    .json();
}
