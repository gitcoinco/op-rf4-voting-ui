"use client";
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export function MetricSort() {
  const [asc, setState] = useState(false);

  const icon = asc ? ArrowUpWideNarrow : ArrowDownNarrowWide;
  const title = asc ? "Ascending" : "Descending";
  return (
    <Button
      onClick={() => setState((s) => !s)}
      className="w-2/5"
      iconRight={icon}
      variant="ghost"
      size="xs"
    >
      {title}
    </Button>
  );
}
