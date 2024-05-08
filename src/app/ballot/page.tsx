"use client";
import { useAccount } from "wagmi";
import { EmptyBallot, NonBadgeholder } from "@/components/ballot/ballot-states";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/common/button";
import { Info } from "lucide-react";
import { metrics } from "@/data/metrics";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SubmitDialog } from "@/components/ballot/submit-dialog";
import { BallotEditor } from "../../components/ballot/ballot-editor";
import { useForm } from "react-hook-form";
import { useBallot } from "@/hooks/useBallot";

export default function BallotPage() {
  const { address } = useAccount();
  const { data: ballot, isPending } = useBallot();

  console.log("ballot", ballot);

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
  const ballotMetrics = metrics.slice(0, 5);

  const metricsWithAmounts = ballotMetrics.map((m) => ({
    ...m,
    amount: Math.round(100 / ballotMetrics.length),
  }));
  const form = useForm({
    defaultValues: { metrics: metricsWithAmounts },
    mode: "all",
  });

  return (
    <Card className="p-6">
      <BallotEditor metrics={ballotMetrics} />
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
        <span className="text-sm text-destructive">
          Weights must add up to 100%
        </span>
      </div>

      <SubmitDialog
        open={isSubmitting}
        onOpenChange={() => setSubmitting(false)}
      />
    </Card>
  );
}
