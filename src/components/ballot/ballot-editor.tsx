"use client";
import { NumericFormat } from "react-number-format";

import { Button } from "@/components/common/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

export function BallotEditor({ metrics = [] }: { metrics: Metric[] }) {
  const metricById = Object.fromEntries(metrics.map((m) => [m.id, m]));
  const { inc, dec, remove, reset, percentages, total } = useBallot(metrics);

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
                  tabIndex={-1}
                  disabled={percentage <= 0}
                  onClick={() => dec(metric.id)}
                />
                <NumericFormat
                  suffix={"%"}
                  min={0}
                  max={100}
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
                  value={percentage}
                />

                <Button
                  size={"icon"}
                  variant="ghost"
                  icon={Plus}
                  tabIndex={-1}
                  disabled={percentage >= 100 || total >= 100}
                  onClick={() => inc(metric.id)}
                />
              </div>
              <Button
                size="icon"
                className="rounded-full"
                variant="ghost"
                icon={Trash2}
                tabIndex={-1}
                onClick={() => remove(metric.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
