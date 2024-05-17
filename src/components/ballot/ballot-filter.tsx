"use client";
import { NumericFormat } from "react-number-format";
import { ChevronDown, Lock, LockOpen, Minus, Plus, Trash2 } from "lucide-react";
import { Heading } from "@/components/ui/headings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useBallotContext } from "../ballot/provider";
import { useSortBallot } from "@/hooks/useBallotEditor";
import { decode, encode, sortLabels } from "@/hooks/useFilter";

export function BallotFilter() {
  const { state } = useBallotContext();
  const { filter, setFilter } = useSortBallot(state);

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary" iconRight={ChevronDown}>
            {sortLabels[encode(filter)]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort by name</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={encode(filter)}
            onValueChange={(value) => setFilter(decode(value))}
          >
            {(["name_asc", "name_desc"] as const).map((value) => (
              <DropdownMenuRadioItem key={value} value={value}>
                {sortLabels[value]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuLabel>Sort by weight</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={encode(filter)}
            onValueChange={(value) => setFilter(decode(value))}
          >
            {(["allocation_asc", "allocation_desc"] as const).map((value) => (
              <DropdownMenuRadioItem key={value} value={value}>
                {sortLabels[value]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"secondary"}>...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Import ballot</DropdownMenuItem>
          <DropdownMenuItem>Export ballot</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
