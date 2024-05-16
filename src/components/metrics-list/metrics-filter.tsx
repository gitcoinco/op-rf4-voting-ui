"use client";
import { Button } from "@/components/common/button";
import { SearchInput } from "@/components/common/search-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import { OrderBy, SortOrder, sortLabels, useFilter } from "@/hooks/useFilter";

function decode(val: string) {
  const [order, sort] = val.split("_") as [OrderBy, SortOrder];
  return { order, sort };
}
function encode(filter: { order: OrderBy; sort: SortOrder }) {
  return `${filter.order}_${filter.sort}` as const;
}

export function MetricsFilter() {
  const [filter, setFilter] = useFilter();
  return (
    <section className="flex justify-between gap-2">
      <SearchInput
        placeholder="Search..."
        className="flex-1 max-w-[420px]"
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
      />
      <div className="flex gap-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="added">Added</Label>
          <Switch
            id="added"
            checked={filter.inBallot}
            onCheckedChange={(inBallot) => setFilter({ inBallot })}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" icon={ChevronDown} iconSide="right">
              {sortLabels[encode(filter)]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sorting</DropdownMenuLabel>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
