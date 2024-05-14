"use client";
import ky from "ky";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";

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
      metricId: "gas fees",
      allocation: 17.916666666666668,
    },
    {
      metricId: "trusted transactions",
      allocation: 35,
    },
    {
      metricId: "avg monthly transactions",
      allocation: 11.25,
    },
    {
      metricId: "days above 10k transactions",
      allocation: 17.916666666666668,
    },
    {
      metricId: "monthly active developers",
      allocation: 17.916666666666668,
    },
  ],
  ballotCasterAddress: "0x277D95C4646827Ea5996E998B31704C0964F79b1",
};
export function useBallot() {
  const { address } = useAccount();
  return useQuery({
    enabled: Boolean(address),
    queryKey: ["ballot", { address }],
    queryFn: async () => {
      return mockBallot;
      // return ky.get(`${agoraRoundsAPI}/ballots/${address}`).json<{
      //   allocations: Allocation[];
      // }>();
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
      console.log("save ballot", allocation);
      // await ky
      //   .post(`/api/agora/ballots/${address}/impactMetrics`, {
      //     json: allocation,
      //   })
      //   .json();

      return new Promise((r) =>
        setTimeout(() => {
          mockBallot.allocations = mockBallot.allocations.map((a) =>
            a.metricId === allocation.metricId ? allocation : { ...a }
          );
          queryClient.invalidateQueries({ queryKey: ["ballot"] });
          r({});
        }, 1000)
      );
    },
    onSuccess: () => toast({ title: "Ballot saved" }),
  });
}
