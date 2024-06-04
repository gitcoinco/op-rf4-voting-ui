"use client";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useVoteComment, useCommentVotes } from "@/hooks/useComments";
import { Button } from "../ui/button";

export function CommentUpvote({ commentId = "", metricId = "" }) {
  const vote = useVoteComment();
  const votes = useCommentVotes({ commentId, metricId });
  function handleVote(vote: 1 | -1 | 0) {
    vote.mutate({ commentId, metricId, vote });
  }
  const isPending = vote.isPending || votes.isPending;
  return (
    <div className="px-2 py-1 border flex rounded-md gap-2 items-center text-sm">
      <Button
        variant={"ghost"}
        className="rounded-full"
        size={"icon"}
        onClick={() => handleVote(1)}
        icon={CircleArrowUp}
        disabled={isPending}
      />
      <span>{votes.data?.length}</span>
      <Button
        variant={"ghost"}
        className="rounded-full"
        size={"icon"}
        onClick={() => handleVote(-1)}
        icon={CircleArrowDown}
        disabled={isPending}
      />
    </div>
  );
}
