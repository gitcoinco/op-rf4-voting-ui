"use client";
import ky from "ky";

import { useMutation, useQuery } from "@tanstack/react-query";
import { agoraRoundsAPI } from "@/config";

import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";

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

type Ballot = {};
export function useSaveBallot() {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["save-ballot"],
    mutationFn: async (ballot: Ballot) => {
      console.log("saving ballot", ballot);
      return new Promise((r) => setTimeout(() => r({}), 1000));
    },
    onSuccess: () => toast({ title: "Ballot saved" }),
  });
}
