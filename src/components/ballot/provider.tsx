"use client";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useBallot, useSaveAllocation } from "@/hooks/useBallot";
import { useBallotEditor } from "@/hooks/useBallotEditor";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { useAccount } from "wagmi";

type BallotContext = ReturnType<typeof useBallotEditor>;
const BallotContext = createContext(
  {} as BallotContext & { isPending: boolean }
);

export function BallotProvider({ children }: PropsWithChildren) {
  const { address } = useAccount();
  const { data: ballot, isFetched, isPending } = useBallot(address);
  const { toast } = useToast();
  const save = useSaveAllocation();

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
    onRemove: (id) => save.mutate({ metric_id: id, allocation: 0 }),
  });

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
