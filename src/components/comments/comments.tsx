"use client";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

import { Heading } from "@/components/ui/headings";
import { Card } from "@/components/ui/card";
import { CommentDialog } from "./comment-dialog";
import { useParams } from "next/navigation";
import {
  type Comment,
  CommentFilter,
  defaultCommentFilter,
  useAddComment,
  useComments,
  useDeleteComment,
  useEditComment,
} from "@/hooks/useComments";
import { AvatarENS, NameENS } from "../ens";
import { useState } from "react";
import { useBallot } from "@/hooks/useBallot";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { CommentSort } from "./comment-sort";
import { CommentUpvote } from "./comment-upvote";
import { CommentDropdown } from "./comment-dropdown";
import { Button } from "../ui/button";
import { Markdown } from "../markdown";
import { Skeleton } from "../ui/skeleton";
import { Alert } from "../ui/alert";
import { useIsBadgeholder } from "@/hooks/useIsBadgeholder";

export function Comments() {
  const params = useParams();
  const metricId = String(params?.id);

  const isBadgeholder = useIsBadgeholder();
  const { address } = useAccount();

  const [isOpen, setOpen] = useState(false);
  const [editComment, setEditComment] = useState<Comment | null>(null);

  const add = useAddComment();
  const edit = useEditComment();
  const remove = useDeleteComment();

  const [filter, setFilter] = useState<CommentFilter>(defaultCommentFilter);

  const comments = useComments(metricId, filter);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Heading variant={"h3"}>Comments</Heading>
        <CommentSort filter={filter} onUpdate={setFilter} />
      </div>
      <div className="space-y-8">
        {comments.isPending &&
          Array(3)
            .fill(0)
            .map((_, i) => <Skeleton className="h-24 w-full" key={i} />)}
        {!comments?.data?.data?.length && (
          <Alert className="text-center opacity-50">
            Be the first to comment this metric
          </Alert>
        )}
        {comments?.data?.data?.map((comment) => {
          const commentId = String(comment["comment_id"]);
          return (
            <div
              key={commentId}
              className={cn("space-y-4", {
                ["animate-pulse opacity-20"]:
                  remove.variables?.commentId === commentId,
              })}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <AvatarENS address={comment.address} />
                  <div className="text-sm">
                    <NameENS
                      className="font-medium"
                      address={comment.address}
                    />
                    <div className="text-muted-foreground">
                      {format(comment["created_at"], "dd MMM")} at{" "}
                      {format(comment["created_at"], "hh:mm a")}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <MetricInBallot
                    address={comment.address}
                    metricId={metricId}
                  />
                  <CommentUpvote
                    count={comment.votes_count}
                    commentId={commentId}
                    metricId={metricId}
                  />
                  {address === comment.address && (
                    <CommentDropdown
                      onEdit={() => (setOpen(true), setEditComment(comment))}
                      onDelete={() => remove.mutate({ commentId, metricId })}
                    />
                  )}
                </div>
              </div>
              <Card className="p-4">
                <Markdown>{comment.comment}</Markdown>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        {isBadgeholder && (
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Add a comment
          </Button>
        )}
        {isOpen && (
          <CommentDialog
            metricId={metricId}
            isOpen={isOpen}
            isLoading={add.isPending || edit.isPending}
            editingComment={editComment}
            setOpen={setOpen}
            onSave={(comment: string) => {
              if (editComment) {
                edit.mutate(
                  {
                    comment,
                    metricId,
                    commentId: String(editComment["comment_id"]),
                  },
                  { onSuccess: () => setOpen(false) }
                );
              } else {
                add.mutate(
                  { comment, metricId },
                  { onSuccess: () => setOpen(false) }
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

function MetricInBallot({ address = "", metricId = "" }) {
  const { data } = useBallot(address);
  const inBallot = data?.allocations
    ?.map((alloc) => alloc["metric_id"])
    .includes(metricId);
  return inBallot ? (
    <div className="text-sm flex gap-2 items-center">
      <CheckCircle className="size-4 text-success-foreground" />
      <div>Added to ballot</div>
    </div>
  ) : null;
}
