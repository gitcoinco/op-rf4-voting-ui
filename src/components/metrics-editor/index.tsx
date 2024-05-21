"use client";
import { NumericFormat } from "react-number-format";
import { Lock, LockOpen, Minus, Plus, Trash2 } from "lucide-react";
import { Heading } from "@/components/ui/headings";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useBallotContext } from "../ballot/provider";
import { useSortBallot } from "@/hooks/useBallotEditor";
import { BallotFilter } from "../ballot/ballot-filter";
import { Metric } from "@/hooks/useMetrics";

export function MetricsEditor({ metrics = [] }: { metrics?: Metric[] }) {
  const { state, inc, dec, set, remove } = useBallotContext();

  const { sorted } = useSortBallot(state);

  const count = useMemo(() => Object.keys(state).length, [state]);
  const metricById = useMemo(
    () => Object.fromEntries(metrics.map((m) => [m.metricId, m])),
    [metrics]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <Heading variant={"h3"}>Your ballot</Heading>
          <div className="text-sm">
            You&apos;ve added {count} of {metrics.length} metrics
          </div>
        </div>
        <BallotFilter />
      </div>

      <div className="divide-y border-y">
        {sorted
          .filter((id) => state[id])
          .map((id) => {
            const { allocation, locked } = state[id];
            const { name } = metricById[id] ?? {};

            return (
              <div key={id} className="py-4 flex justify-between items-center">
                <h3 className="font-medium text-sm">{name}</h3>
                <div className="flex gap-2">
                  <Button
                    size={"icon"}
                    variant="ghost"
                    icon={locked ? Lock : LockOpen}
                    className={cn("rounded-full", { ["opacity-50"]: !locked })}
                    tabIndex={-1}
                    onClick={() => set(id, allocation, locked)}
                  />
                  <div className="flex border rounded-lg">
                    <Button
                      size={"icon"}
                      variant="ghost"
                      icon={Minus}
                      tabIndex={-1}
                      disabled={allocation <= 0}
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
                      value={
                        allocation !== undefined
                          ? allocation.toFixed(2)
                          : undefined
                      }
                      onBlur={(e) => {
                        e.preventDefault();
                        const updated = parseFloat(e.target.value);
                        allocation !== updated && set(id, updated);
                      }}
                    />
                    <Button
                      size={"icon"}
                      variant="ghost"
                      icon={Plus}
                      tabIndex={-1}
                      disabled={allocation >= 100}
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
