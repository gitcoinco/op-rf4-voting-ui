"use client";
import { NumericFormat } from "react-number-format";
import { Lock, LockOpen, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";

type Metric = { id: string; name: string; amount?: number };

import { createGlobalState } from "react-use";
type BallotState = Record<string, { amount: number; locked: boolean }>;
const useBallotState = createGlobalState<BallotState>({});

function useMetricEditor(initialState: Metric[] = []) {
  const [state, setState] = useBallotState();

  useEffect(() => {
    const s = Object.fromEntries(
      initialState.map((m) => [
        m.id,
        { amount: 100 / initialState.length, locked: false },
      ])
    );
    setState(s);
  }, [initialState, setState]);

  const set = (
    id: string,
    amount: number = state[id].amount,
    unlock: boolean = false
  ) => {
    setState((s) => {
      const _state = { ...s, [id]: { ...s[id], amount, locked: !unlock } };

      // Autobalance non-locked fields
      const locked = Object.entries(_state).filter(([id, m]) => m.locked);
      const nonLocked = Object.entries(_state).filter(([id, m]) => !m.locked);

      const amountToBalance =
        100 - locked.reduce((sum, [id, m]) => sum + m.amount, 0);

      return Object.fromEntries(
        Object.entries(_state).map(([id, { amount, locked }]) => {
          return [
            id,
            {
              amount: locked ? amount : amountToBalance / nonLocked.length,
              locked,
            },
          ];
        })
      );
    });
  };
  const inc = (id: string) => set(id, (state[id]?.amount ?? 0) + 5);
  const dec = (id: string) => set(id, (state[id]?.amount ?? 0) - 5);
  const remove = (id: string) => {
    setState((s) => {
      const { [id]: _remove, ...next } = s;
      return next;
    });
  };
  return { set, inc, dec, remove, state };
}

export function BallotEditor({ metrics }: { metrics: Metric[] }) {
  const { state, inc, dec, set, remove } = useMetricEditor(metrics);

  const metricById = useMemo(
    () => Object.fromEntries(metrics.map((m) => [m.id, m])),
    [metrics]
  );
  return (
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
                  value={amount ? amount.toFixed(2) : undefined}
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
  );
}
