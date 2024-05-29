"use client";
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import { Button } from "../ui/button";

export function MetricSort({ sort, setSort}: { sort: boolean, setSort: (bool: boolean) => void}) {

  const icon = sort ? ArrowUpWideNarrow : ArrowDownNarrowWide;
  const title = sort ? "Ascending" : "Descending";
  return (
    <Button
      onClick={() => setSort(!sort)}
      className="w-2/5"
      iconRight={icon}
      variant="ghost"
      size="xs"
    >
      {title}
    </Button>
  );
}
