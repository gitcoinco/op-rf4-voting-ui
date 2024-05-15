"use client";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/common/button";
import { useBallotContext } from "../ballot/provider";

export function AddToBallotButton({
  id,
  variant = "secondary",
}: {
  id: string;
  variant?: "default" | "secondary" | "destructive";
}) {
  const { add, remove, state, isPending } = useBallotContext();

  if (isPending)
    return (
      <Button disabled variant={"secondary"} isLoading>
        Loading
      </Button>
    );
  const isAdded = state[id];
  if (isAdded) {
    return (
      <Button icon={Check} variant="success" onClick={() => remove(id)}>
        Added
      </Button>
    );
  }
  return (
    <Button icon={Plus} variant={variant} onClick={() => add(id)}>
      Add to ballot
    </Button>
  );
}
