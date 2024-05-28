"use client";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { AddCommentButton } from "./add-comment-button";
import { useParams } from "next/navigation";
import { useComments } from "@/hooks/useComments";
import { AvatarENS, NameENS } from "../ens";

export function Comments() {
  const params = useParams();
  const metricId = String(params?.id);

  const { data: comments } = useComments(metricId);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Heading variant={"h3"}>Comments</Heading>
      </div>
      <div className="space-y-8">
        {comments?.data?.map((comment, i) => (
          <div key={comment.commentId} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <AvatarENS address={comment.address} />
                <div className="text-sm">
                  <NameENS className="font-medium" address={comment.address} />
                  <div className="text-muted-foreground">
                    {format(comment.createdAt, "dd MMM")} at{" "}
                    {format(comment.createdAt, "hh:mm a")}
                  </div>
                </div>
              </div>
              <div className="text-sm flex gap-2 items-center">
                <CheckCircle className="size-4 text-success-foreground" />
                <div>Added to ballot</div>
                <div className="text-xs">(TODO)</div>
              </div>
            </div>
            <Card className="p-4">
              <Text>{comment.comment}</Text>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <AddCommentButton metricId={metricId} />
      </div>
    </div>
  );
}
