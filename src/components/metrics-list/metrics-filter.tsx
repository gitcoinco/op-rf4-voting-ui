"use client";
import { Button } from "@/components/ui/button";
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
import {
  decode,
  encode,
  sortLabels,
  useMetricsFilter,
} from "@/hooks/useFilter";

export function MetricsFilter() {
  const [filter, setFilter] = useMetricsFilter();
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
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
