import { agoraRoundsAPI } from "@/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import ky from "ky";

export function useComments(metricId: string) {
  return useQuery({
    queryKey: ["comments", { metricId }],
    queryFn: async () => {
      return [];
    },
  });
}

export function useAddComment() {
  return useMutation({
    mutationFn: async ({ metricId }: { metricId: string }) => {
      return ky.put(`${agoraRoundsAPI}/impactMetrics/${metricId}/comments`);
    },
  });
}

export function useDeleteComment() {
  return useMutation({
    mutationFn: async ({
      metricId,
      commentId,
    }: {
      metricId: string;
      commentId: string;
    }) => {
      return ky.delete(
        `${agoraRoundsAPI}/impactMetrics/${metricId}/comments/${commentId}`
      );
    },
  });
}
