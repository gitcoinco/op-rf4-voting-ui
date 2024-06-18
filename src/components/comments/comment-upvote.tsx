"use client";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useVoteComment, useCommentVotes } from "@/hooks/useComments";
import { Button } from "../ui/button";
import { useIsBadgeholder } from "@/hooks/useIsBadgeholder";

export function CommentUpvote({ count = 0, commentId = "", metricId = "" }) {
  const voteComment = useVoteComment();
  const isBadgeholder = useIsBadgeholder();
  const votes = useCommentVotes({ commentId, metricId });
  function handleVote(vote = 0) {
    voteComment.mutate({ commentId, metricId, vote });
  }

  const currentVote = votes.data?.find(
    (v) => String(v.comment_id) === commentId
  );
  const isPending = voteComment.isPending || votes.isPending;
  return (
    <div className="px-2 py-1 border flex rounded-md gap-2 items-center text-sm">
      <Button
        variant={"ghost"}
        className="rounded-full"
        size={"icon"}
        onClick={() => handleVote(currentVote?.vote === 1 ? 0 : 1)}
        icon={CircleArrowUp}
        // disabled={isPending || !isBadgeholder}
        disabled={isPending}
      />
      <span>{count}</span>
      <Button
        variant={"ghost"}
        className="rounded-full"
        size={"icon"}
        onClick={() => handleVote(currentVote?.vote === -1 ? 0 : -1)}
        icon={CircleArrowDown}
        // disabled={isPending || !isBadgeholder}
        disabled={isPending}
      />
    </div>
  );
}
