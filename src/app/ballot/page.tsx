"use client";
import { useAccount } from "wagmi";
import { EmptyBallot, NonBadgeholder } from "@/components/ballot/ballot-states";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/common/button";
import { ChevronDown, Info, Minus, Plus, Trash, Trash2 } from "lucide-react";
import { metrics } from "@/data/metrics";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SubmitDialog } from "@/components/ballot/submit-dialog";
import Link from "next/link";

export default function BallotPage() {
  const { address } = useAccount();
  const isEmptyBallot = !Boolean(address);

  return <YourBallot />;
  if (isEmptyBallot) {
    return <EmptyBallot />;
  }
  return (
    <div>
      <NonBadgeholder />
    </div>
  );
}

function YourBallot() {
  const [isSubmitting, setSubmitting] = useState(false);
  const ballotMetrics = metrics.slice(0, 5);
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading variant={"h3"}>Your ballot</Heading>
          <Text>You&apos;ve added 5 of 20 metrics</Text>
        </div>
        <div className="flex gap-2">
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
          <Button variant={"secondary"}>Weight evenly</Button>
        </div>
      </div>

      <BallotMetrics metrics={ballotMetrics} />
      <div className="flex items-center space-x-2 py-6 text-muted-foreground">
        <Checkbox id="rewardOpenSource" />
        <label
          htmlFor="rewardOpenSource"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I only want to reward open source projects
        </label>
        <Info className="size-4" />
      </div>

      <div className="flex items-center gap-4">
        <Button variant={"destructive"} onClick={() => setSubmitting(true)}>
          Submit ballot
        </Button>
        <span className="text-sm text-destructive">
          Weights must add up to 100%
        </span>
      </div>

      <SubmitDialog
        open={isSubmitting}
        onOpenChange={() => setSubmitting(false)}
      />
    </Card>
  );
}

type Metric = { id: string; name: string; amount?: number };
function useBallot(initialMetrics: Metric[]) {
  const initialPercentages = Object.fromEntries(
    initialMetrics.map((m) => [m.id, m.amount ?? 0])
  );
  const [percentages, setPercentage] =
    useState<Record<string, number>>(initialPercentages);

  const inc = (id: string) =>
    setPercentage({ ...percentages, [id]: (percentages[id] ?? 0) + 5 });
  const dec = (id: string) =>
    setPercentage({ ...percentages, [id]: (percentages[id] ?? 0) - 5 });

  const total = Object.entries(percentages).reduce((sum, [_, x]) => sum + x, 0);
  const reset = () => setPercentage({});
  const remove = (id: string) =>
    setPercentage((state) => {
      delete state[id];
      return { ...state };
    });

  return { inc, dec, remove, reset, percentages, total };
}
function BallotMetrics({ metrics = [] }: { metrics: Metric[] }) {
  const metricById = Object.fromEntries(metrics.map((m) => [m.id, m]));
  const { inc, dec, remove, reset, percentages, total } = useBallot(metrics);

  console.log(percentages);
  return (
    <div className="space-y-4 divide-y border-y">
      {Object.keys(percentages).map((id) => {
        const metric = metricById[id];
        const percentage = percentages[metric.id];
        return (
          <div
            key={metric.id}
            className="pt-4 flex justify-between items-center"
          >
            <h3 className="font-medium text-sm">{metric.name}</h3>
            <div className="flex gap-2">
              <div className="flex border rounded-lg">
                <Button
                  size={"icon"}
                  variant="ghost"
                  icon={Minus}
                  disabled={percentage <= 0}
                  onClick={() => dec(metric.id)}
                />
                <input
                  className="w-16 text-center"
                  placeholder="--%"
                  value={`${percentage}%`}
                />
                <Button
                  size={"icon"}
                  variant="ghost"
                  icon={Plus}
                  disabled={percentage >= 100 || total >= 100}
                  onClick={() => inc(metric.id)}
                />
              </div>
              <Button
                size="icon"
                className="rounded-full"
                variant="ghost"
                icon={Trash2}
                onClick={() => remove(metric.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
