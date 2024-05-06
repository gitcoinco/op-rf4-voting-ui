// import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../common/button";

export function MetricDropdown() {
  // const [selected, setSelected] = useState("right");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-3/5" size="xs">
          <div className="truncate">All metrics from your ballot</div>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuRadioGroup value={"bottom"}>
          <DropdownMenuCheckboxItem checked>
            All metrics from your ballot
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Demand for Optimism Blockspace Generated
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Interactions from Repeat & Trusted Optimism...
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Interactions from Trusted Optimism Users
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Repeat Interactions from Trusted Optimism Us...
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            Trusted Optimism User Onboarded
          </DropdownMenuCheckboxItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
