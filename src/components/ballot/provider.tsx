"use client";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import {
  Ballot,
  useBallot,
  useRemoveAllocation,
  useSaveAllocation,
} from "@/hooks/useBallot";
import { useBallotEditor } from "@/hooks/useBallotEditor";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { useAccount } from "wagmi";

type BallotContext = ReturnType<typeof useBallotEditor>;
const BallotContext = createContext(
  {} as BallotContext & {
    isPending: boolean;
    ballot?: Ballot | null;
  }
);

export function BallotProvider({ children }: PropsWithChildren) {
  const { address } = useAccount();
  const { data: ballot, isFetched, isPending } = useBallot(address);
  const { toast } = useToast();
  const save = useSaveAllocation();
  const remove = useRemoveAllocation();

  const editor = useBallotEditor({
    onAdd: () =>
      toast({
        title: "Added to ballot",
        action: (
          <ToastAction altText="View ballot" asChild>
            <Link href={`/ballot`}>View</Link>
          </ToastAction>
        ),
      }),
    onUpdate: save.mutate,
    onRemove: remove.mutate,
  });

  useEffect(() => {
    isFetched && editor.reset(ballot?.allocations);
  }, [isFetched]); // Only trigger when isFetched is changed

  const value = { ballot, isPending, ...editor };

  return (
    <BallotContext.Provider value={value}>{children}</BallotContext.Provider>
  );
}

export function useBallotContext() {
  return useContext(BallotContext);
}
