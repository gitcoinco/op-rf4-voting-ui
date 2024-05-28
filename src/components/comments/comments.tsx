"use client";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { AddCommentButton } from "./add-comment-button";
import { useParams } from "next/navigation";
import {
  CommentFilter,
  defaultCommentFilter,
  useComments,
  useDeleteComment,
} from "@/hooks/useComments";
import { AvatarENS, NameENS } from "../ens";
import { useState } from "react";
import { useBallot } from "@/hooks/useBallot";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import { CommentSort } from "./comment-sort";
import { CommentUpvote } from "./comment-upvote";
import { CommentDropdown } from "./comment-dropdown";

export function Comments() {
  const params = useParams();
  const { address } = useAccount();
  const remove = useDeleteComment();
  const [filter, setFilter] = useState<CommentFilter>(defaultCommentFilter);
  const metricId = String(params?.id);

  const { data: comments } = useComments(metricId, filter);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Heading variant={"h3"}>Comments</Heading>
        <CommentSort filter={filter} onUpdate={setFilter} />
      </div>
      <div className="space-y-8">
        {comments?.data?.map((comment, i) => {
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
                      onDelete={() => remove.mutate({ commentId, metricId })}
                    />
                  )}
                </div>
              </div>
              <Card className="p-4">
                <Text>{comment.comment}</Text>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <AddCommentButton metricId={metricId} />
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
