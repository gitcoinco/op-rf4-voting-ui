"use client";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useBallot, useSaveAllocation } from "@/hooks/useBallot";
import { useBallotEditor } from "@/hooks/useBallotEditor";

const BallotContext = createContext(
  {} as ReturnType<typeof useBallotEditor> & {
    isPending: boolean;
  }
);

export function BallotProvider({ children }: PropsWithChildren) {
  const { data: ballot, isFetched, isPending } = useBallot();
  const save = useSaveAllocation();

  const editor = useBallotEditor({ onUpdate: save.mutate });

  useEffect(() => {
    isFetched && editor.reset(ballot?.allocations, true);
  }, [isFetched]); // Only trigger when isFetched is changed

  const value = { ballot, isPending, ...editor };

  return (
    <BallotContext.Provider value={value}>{children}</BallotContext.Provider>
  );
}

export function useBallotContext() {
  return useContext(BallotContext);
}
