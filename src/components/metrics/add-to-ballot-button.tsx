"use client";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBallotContext } from "../ballot/provider";
import mixpanel from "@/lib/mixpanel";

export function AddToBallotButton({
  id = "",
  variant = "secondary",
}: {
  id?: string;
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
      <Button
        icon={Check}
        variant="success"
        onClick={() => {
          remove(id);
          mixpanel.track("Remove from ballot", { id });
        }}
      >
        Added
      </Button>
    );
  }
  return (
    <Button
      disabled={!id}
      icon={Plus}
      variant={variant}
      onClick={() => {
        add(id);
        mixpanel.track("Add to ballot", { id });
      }}
    >
      Add to ballot
    </Button>
  );
}
