"use client";
import { useCallback, useEffect } from "react";

type Metric = { id: string; name: string; amount?: number };

import { createGlobalState } from "react-use";
type BallotState = Record<string, { amount: number; locked: boolean }>;
const useBallotState = createGlobalState<BallotState>({});

export function useMetricEditor(initialState: Metric[] = []) {
  const [state, setState] = useBallotState();

  const setInitialState = useCallback(() => {
    setState(
      Object.fromEntries(
        initialState.map((m) => [
          m.id,
          { amount: 100 / initialState.length, locked: false },
        ])
      )
    );
  }, [setState, initialState]);
  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const set = (
    id: string,
    amount: number = state[id].amount,
    unlock: boolean = false
  ) => {
    setState((s) => {
      const _state = {
        ...s,
        [id]: {
          ...s[id],
          // Must be between 0 - 100
          amount: Math.max(Math.min(amount, 100), 0),
          locked: !unlock,
        },
      };

      return calculateBalancedAmounts(_state);
    });
  };
  const inc = (id: string) => set(id, (state[id]?.amount ?? 0) + 5);
  const dec = (id: string) => set(id, (state[id]?.amount ?? 0) - 5);
  const reset = () => setInitialState();
  const remove = (id: string) =>
    setState((s) => {
      const { [id]: _remove, ...next } = s;
      return next;
    });
  return { set, inc, dec, remove, reset, state };
}

function calculateBalancedAmounts(state: BallotState) {
  // Autobalance non-locked fields
  const locked = Object.entries(state).filter(([id, m]) => m.locked);
  const nonLocked = Object.entries(state).filter(([id, m]) => !m.locked);

  const amountToBalance =
    100 - locked.reduce((sum, [id, m]) => sum + m.amount, 0);

  return Object.fromEntries(
    Object.entries(state).map(([id, { amount, locked }]) => {
      return [
        id,
        {
          amount: locked
            ? amount
            : amountToBalance
            ? amountToBalance / nonLocked.length
            : 0,
          locked,
        },
      ];
    })
  );
}
