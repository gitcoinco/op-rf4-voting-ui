"use client";
import { NumericFormat } from "react-number-format";
import { ChevronDown, Lock, LockOpen, Minus, Plus, Trash2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useMetricEditor } from "@/hooks/useMetricsEditor";

type Metric = { id: string; name: string; amount?: number };

export function BallotEditor({ metrics }: { metrics: Metric[] }) {
  const { state, inc, dec, set, remove, reset } = useMetricEditor(metrics);

  const metricById = useMemo(
    () => Object.fromEntries(metrics.map((m) => [m.id, m])),
    [metrics]
  );
  return (
    <div>
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
          <Button variant={"secondary"} onClick={reset}>
            Weight evenly
          </Button>
        </div>
      </div>

      <div className="divide-y border-y">
        {Object.entries(state).map(([id, { amount, locked }]) => {
          const { name } = metricById[id];

          return (
            <div key={id} className="py-4 flex justify-between items-center">
              <h3 className="font-medium text-sm">{name}</h3>
              <div className="flex gap-2">
                <Button
                  size={"icon"}
                  variant="ghost"
                  icon={locked ? Lock : LockOpen}
                  disabled={!amount}
                  className={cn("rounded-full", { ["opacity-50"]: !locked })}
                  tabIndex={-1}
                  onClick={() => set(id, amount, locked)}
                />
                <div className="flex border rounded-lg">
                  <Button
                    size={"icon"}
                    variant="ghost"
                    icon={Minus}
                    tabIndex={-1}
                    disabled={amount <= 0}
                    onClick={() => dec(id)}
                  />
                  <NumericFormat
                    min={0}
                    max={100}
                    suffix={"%"}
                    allowNegative={false}
                    allowLeadingZeros={false}
                    isAllowed={(values) => (values?.floatValue ?? 0) <= 100}
                    customInput={(p) => (
                      <input
                        className="w-16 text-center"
                        {...p}
                        max={100}
                        min={0}
                      />
                    )}
                    placeholder="--%"
                    value={amount !== undefined ? amount.toFixed(2) : undefined}
                    onBlur={(e) => {
                      e.preventDefault();
                      const updated = parseFloat(e.target.value);
                      amount !== updated && set(id, updated);
                    }}
                  />
                  <Button
                    size={"icon"}
                    variant="ghost"
                    icon={Plus}
                    tabIndex={-1}
                    disabled={amount >= 100}
                    onClick={() => inc(id)}
                  />
                </div>
                <Button
                  size="icon"
                  className="rounded-full"
                  variant="ghost"
                  icon={Trash2}
                  tabIndex={-1}
                  onClick={() => remove(id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
