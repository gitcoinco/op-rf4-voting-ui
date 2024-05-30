"use client";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MetricNameFromId } from "./metric-name-from-id";

export function MetricDropdown({
  categories,
  filter,
  onChange,
}: {
  categories: string[];
  filter: string;
  onChange: (filter: string) => void;
}) {
  console.log("filter", filter, Boolean(filter));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-3/5" size="xs">
          <div className="truncate">
            {filter ? (
              <MetricNameFromId id={filter} />
            ) : (
              "All metrics from your ballot"
            )}
          </div>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuRadioGroup value={"bottom"}>
          <DropdownMenuCheckboxItem
            checked={!filter}
            onClick={() => onChange("")}
          >
            All metrics from your ballot
          </DropdownMenuCheckboxItem>
          {categories?.map((id) => (
            <DropdownMenuCheckboxItem
              key={id}
              id={id}
              checked={filter === id}
              onClick={() => onChange(id)}
            >
              <MetricNameFromId id={id} />
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
