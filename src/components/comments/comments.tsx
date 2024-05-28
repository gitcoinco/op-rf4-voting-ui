"use client";
import { format } from "date-fns";
import { CheckCircle, ChevronDown } from "lucide-react";

import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { AddCommentButton } from "./add-comment-button";
import { useParams } from "next/navigation";
import {
  CommentFilter,
  CommentSort,
  commentSortLabels,
  defaultCommentFilter,
  useComments,
} from "@/hooks/useComments";
import { AvatarENS, NameENS } from "../ens";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";

export function Comments() {
  const params = useParams();
  const [filter, setFilter] = useState<CommentFilter>(defaultCommentFilter);
  const metricId = String(params?.id);

  const { data: comments } = useComments(metricId, filter);

  console.log(filter);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Heading variant={"h3"}>Comments</Heading>
        <CommentSort filter={filter} onUpdate={setFilter} />
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

function CommentSort({
  filter,
  onUpdate,
}: {
  filter: CommentFilter;
  onUpdate: (filter: CommentFilter) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary" iconRight={ChevronDown}>
          {commentSortLabels[filter.sort]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={filter.sort}
          onValueChange={(sort) =>
            onUpdate({ ...filter, sort: sort as CommentSort })
          }
        >
          {Object.keys(commentSortLabels).map((value) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {commentSortLabels[value as CommentSort]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
