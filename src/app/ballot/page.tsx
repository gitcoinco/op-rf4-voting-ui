"use client";
import { useAccount } from "wagmi";
import { EmptyBallot, NonBadgeholder } from "@/components/ballot/ballot-states";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/common/button";
import { Info, LoaderIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SubmitDialog } from "@/components/ballot/submit-dialog";
import { MetricsEditor } from "../../components/metrics-editor";
import { useBallot, useSaveBallot } from "@/hooks/useBallot";
import { useIsMutating } from "@tanstack/react-query";
import { useMetrics } from "@/hooks/useMetrics";

export default function BallotPage() {
  const { address } = useAccount();
  const { data: ballot, isPending } = useBallot();

  if (isPending) {
    return <Card className="p-6">loading...</Card>;
  }
  if (!address) {
    return (
      <div>
        <NonBadgeholder />
      </div>
    );
  }
  const isEmptyBallot = !ballot?.allocations.length;
  if (isEmptyBallot) {
    return <EmptyBallot />;
  }
  return <YourBallot />;
}

function YourBallot() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: ballot } = useBallot();
  const { data: metrics } = useMetrics();

  const save = useSaveBallot();

  return (
    <Card className="p-6">
      <MetricsEditor
        metrics={metrics}
        allocations={ballot?.allocations ?? []}
        onUpdate={(allocations) => save.mutate(allocations)}
      />
      <div className="flex items-center space-x-2 py-6 text-muted-foreground">
        <Checkbox id="rewardOpenSource" />
        <label
          htmlFor="rewardOpenSource"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I only want to reward open source projects
        </label>
        <Info className="size-4" />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant={"destructive"}
          type="submit"
          onClick={() => setSubmitting(true)}
        >
          Submit ballot
        </Button>
        <IsSavingBallot />
      </div>

      <SubmitDialog
        open={isSubmitting}
        onOpenChange={() => setSubmitting(false)}
      />
    </Card>
  );
}

function WeightsError() {
  return (
    <span className="text-sm text-destructive">
      Weights must add up to 100%
    </span>
  );
}

function IsSavingBallot() {
  const isSavingBallot = useIsMutating({ mutationKey: ["save-ballot"] });

  return isSavingBallot ? (
    <span className="flex gap-2">
      <LoaderIcon className={"animate-spin size-4"} />
      <span className="text-xs">Saving ballot...</span>
    </span>
  ) : null;
}
