"use client";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/common/button";

export function AddToBallotButton({
  isAdded,
  metricId,
}: {
  isAdded: boolean;
  metricId: string;
}) {
  if (isAdded) {
    return (
      <Button
        icon={Check}
        variant="success"
        onClick={() => notImplemented("remove from ballot")}
      >
        Added
      </Button>
    );
  }
  return (
    <Button
      icon={Plus}
      variant="secondary"
      onClick={() => notImplemented("add to ballot")}
    >
      Add to ballot
    </Button>
  );
}
function notImplemented(text = "") {
  return alert(`not implemented: ${text}`);
}
