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

export function Comments() {
  const params = useParams();
  const metricId = String(params?.id);

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
        {comments?.data?.data?.map((comment) => {
          const commentId = String(comment.commentId);
          return (
            <div
              key={comment.commentId}
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
                      {format(comment.createdAt, "dd MMM")} at{" "}
                      {format(comment.createdAt, "hh:mm a")}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <MetricInBallot
                    address={comment.address}
                    metricId={metricId}
                  />
                  <CommentUpvote
                    commentId={String(comment.commentId)}
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
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Add a comment
        </Button>
        {isOpen && (
          <CommentDialog
            isOpen={isOpen}
            editingComment={editComment}
            setOpen={setOpen}
            onSave={(comment: string) => {
              if (editComment) {
                edit.mutate(
                  {
                    comment,
                    metricId,
                    commentId: String(editComment.commentId),
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
    ?.map((alloc) => alloc.metricId)
    .includes(metricId);

  return inBallot ? (
    <div className="text-sm flex gap-2 items-center">
      <CheckCircle className="size-4 text-success-foreground" />
      <div>Added to ballot</div>
      <div className="text-xs">(TODO)</div>
    </div>
  ) : null;
}
