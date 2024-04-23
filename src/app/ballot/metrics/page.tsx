import { Button } from "@/components/common/button";
import { SearchInput } from "@/components/common/search-input";
import { AddToBallotButton } from "@/components/metrics/add-to-ballot-button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/headings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { metrics } from "@/data/metrics";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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
      <section className="space-y-4">
        {metrics.map((metric, i) => (
          <Card key={metric.id} className="p-6">
            <div className="flex gap-8">
              <div className="flex-1 space-y-4">
                <Heading variant="h3" asChild className="hover:underline">
                  <Link href={`/metrics/${metric.id}`}>{metric.name}</Link>
                </Heading>
                <Text className="text-gray-700">{metric.description}</Text>
                <Text className="text-sm text-gray-700">Comments: 12</Text>
              </div>
              <div>
                <AddToBallotButton metricId={metric.id} isAdded={i === 0} />
              </div>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
