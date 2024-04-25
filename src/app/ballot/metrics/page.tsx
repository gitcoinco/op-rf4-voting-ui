import { Button } from "@/components/common/button";
import { SearchInput } from "@/components/common/search-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import { MetricsList } from "../../../components/metrics/metrics-list";

export default function MetricsPage() {
  return (
    <>
      <section className="flex justify-between gap-2">
        <SearchInput placeholder="Search..." className="flex-1 max-w-[420px]" />
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="added">Added</Label>
            <Switch id="added" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="secondary" icon={ChevronDown} iconSide="right">
                A-Z
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sorting</DropdownMenuLabel>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
              <DropdownMenuItem>Z-A</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <MetricsList />
    </>
  );
}
