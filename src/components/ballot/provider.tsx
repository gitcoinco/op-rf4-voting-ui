"use client";
import { useBallot, useSaveBallot } from "@/hooks/useBallot";
import { useBallotEditor } from "@/hooks/useBallotEditor";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

const BallotContext = createContext({} as ReturnType<typeof useBallotEditor>);

export function BallotProvider({ children }: PropsWithChildren) {
  const { data: ballot, isFetched } = useBallot();
  const save = useSaveBallot();
  const editor = useBallotEditor({ onUpdate: save.mutate });

  useEffect(() => {
    isFetched && editor.reset(ballot?.allocations, true);
  }, [isFetched]); // Only trigger when isFetched is changed

  const value = { ballot, ...editor };

  return (
    <BallotContext.Provider value={value}>{children}</BallotContext.Provider>
  );
}

export function useBallotContext() {
  return useContext(BallotContext);
}
