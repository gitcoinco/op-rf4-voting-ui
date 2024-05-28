import { agoraRoundsAPI } from "@/config";
import { request } from "@/lib/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Comment = {
  address: string;
  comment: string;
  commentId: number;
  createdAt: string;
  updatedAt: string;
  votes: [];
  voteCount: number;
};
type Meta = {
  has_next: boolean;
  next_offset: number;
  total_returned: number;
};

export function useComments(metricId = "_") {
  return useQuery({
    queryKey: ["comments", { metricId }],
    queryFn: async () =>
      request
        .get(`${agoraRoundsAPI}/impactMetrics/${metricId}/comments`)
        .json<{ data: Comment[]; meta: Meta }>(),
    enabled: Boolean(metricId),
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      metricId,
      comment,
    }: {
      metricId: string;
      comment: string;
    }) =>
      request
        .put(`${agoraRoundsAPI}/impactMetrics/${metricId}/comments`, {
          json: { comment },
        })
        .then(async (r) => {
          await queryClient.invalidateQueries({
            queryKey: ["comments", { metricId }],
          });
          return r;
        }),
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
      return request.delete(
        `${agoraRoundsAPI}/impactMetrics/${metricId}/comments/${commentId}`
      );
    },
  });
}
