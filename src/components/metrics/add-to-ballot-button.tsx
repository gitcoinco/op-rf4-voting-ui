"use client";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/common/button";
import { useBallotContext } from "../ballot/provider";

export function AddToBallotButton({ metricId }: { metricId: string }) {
  const { add, remove, state } = useBallotContext();

  const isAdded = state[metricId];
  if (isAdded) {
    return (
      <Button icon={Check} variant="success" onClick={() => remove(metricId)}>
        Added
      </Button>
    );
  }
  return (
    <Button icon={Plus} variant="secondary" onClick={() => add(metricId)}>
      Add to ballot
    </Button>
  );
}
