"use client";
import { useCallback, useEffect } from "react";

import { createGlobalState, useDebounce } from "react-use";
import { Allocation } from "./useBallot";

type BallotState = Record<string, { allocation: number; locked: boolean }>;

const useBallotState = createGlobalState<BallotState>({});

export function useMetricsEditor(
  allocations: Allocation[],
  {
    debounceRate = 2000,
    onUpdate,
  }: { debounceRate?: number; onUpdate?: (allocations: Allocation[]) => void }
) {
  const [state, setState] = useBallotState();

  const setInitialState = useCallback(
    (preserveAllocations = false) => {
      setState(
        Object.fromEntries(
          allocations.map((m) => [
            m.metricId,
            {
              allocation: preserveAllocations
                ? m.allocation
                : 100 / allocations.length,
              locked: false,
            },
          ])
        )
      );
    },
    [setState, allocations]
  );
  useEffect(() => {
    setInitialState(true);
  }, [setInitialState]);

  useDebounce(
    () => {
      const _allocations = Object.entries(state).map(
        ([metricId, { allocation }]) => ({
          metricId,
          allocation,
        })
      );
      // Only update if changed
      if (JSON.stringify(_allocations) !== JSON.stringify(allocations)) {
        return onUpdate?.(_allocations);
      }
    },
    debounceRate,
    [state]
  );

  const set = (
    id: string,
    allocation: number = state[id].allocation,
    unlock: boolean = false
  ) => {
    setState((s) => {
      const _state = {
        ...s,
        [id]: {
          ...s[id],
          // Must be between 0 - 100
          allocation: Math.max(Math.min(allocation, 100), 0),
          locked: !unlock,
        },
      };

      return calculateBalancedAmounts(_state);
    });
  };
  const inc = (id: string) => set(id, (state[id]?.allocation ?? 0) + 5);
  const dec = (id: string) => set(id, (state[id]?.allocation ?? 0) - 5);
  const add = (id: string, allocation = 0) => set(id, allocation);
  const remove = (id: string) =>
    setState((s) => {
      const { [id]: _remove, ..._state } = s;
      return calculateBalancedAmounts(_state);
    });
  const reset = () => setInitialState();

  return { set, inc, dec, add, remove, reset, state };
}

function calculateBalancedAmounts(state: BallotState) {
  // Autobalance non-locked fields
  const locked = Object.entries(state).filter(([_, m]) => m.locked);
  const nonLocked = Object.entries(state).filter(([_, m]) => !m.locked);

  const amountToBalance =
    100 - locked.reduce((sum, [_, m]) => sum + m.allocation, 0);

  return Object.fromEntries(
    Object.entries(state).map(([id, { allocation, locked }]) => {
      return [
        id,
        {
          allocation: locked
            ? allocation
            : amountToBalance
            ? amountToBalance / nonLocked.length
            : 0,
          locked,
        },
      ];
    })
  );
}
