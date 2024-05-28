"use client";
import { ChevronDown } from "lucide-react";

import {
  CommentFilter,
  commentSortLabels,
  type CommentSort,
} from "@/hooks/useComments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export function CommentSort({
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
