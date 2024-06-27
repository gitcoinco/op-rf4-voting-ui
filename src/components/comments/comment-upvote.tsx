"use client";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useVoteComment, useCommentVotes } from "@/hooks/useComments";
import { Button } from "../ui/button";
import { useIsBadgeholder } from "@/hooks/useIsBadgeholder";
import { cn } from "@/lib/utils";

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
        variant="ghost"
        className={cn("rounded-full", {
          ["text-success-foreground"]: currentVote?.vote === 1,
        })}
        size={"icon"}
        onClick={() => handleVote(currentVote?.vote === 0 ? 1 : 0)}
        icon={CircleArrowUp}
        // disabled={isPending || !isBadgeholder}
        disabled={!isBadgeholder || isPending || currentVote?.vote === 1}
      />
      <span>{count}</span>
      <Button
        variant="ghost"
        className={cn("rounded-full", {
          ["text-red-500"]: currentVote?.vote === -1,
        })}
        size={"icon"}
        onClick={() => handleVote(currentVote?.vote === 0 ? -1 : 0)}
        icon={CircleArrowDown}
        // disabled={isPending || !isBadgeholder}
        disabled={!isBadgeholder || isPending || currentVote?.vote === -1}
      />
    </div>
  );
}
