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
import { useBallot } from "@/hooks/useBallot";
import { useIsMutating } from "@tanstack/react-query";
import { useMetrics } from "@/hooks/useMetrics";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";

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
  const { data: metrics } = useMetrics();

  return (
    <Card className="p-6 space-y-8">
      <MetricsEditor metrics={metrics} />
      <OpenSourceMultiplier />

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

function OpenSourceMultiplier() {
  const [multiplier, setMultiplier] = useState<number | undefined>();

  return (
    <Card className="p-4">
      <div className="space-y-4 mb-4">
        <div className="text-muted-foreground text-xs">Optional</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="font-medium text-sm">
              Add an open source reward multiplier
            </div>
            <Badge variant={"secondary"}>Off</Badge>
          </div>

          <div className="flex gap-2 flex-1">
            <Slider
              value={multiplier ? [multiplier] : undefined}
              onValueChange={([v]) => setMultiplier(v)}
              min={0}
              step={0.1}
              max={5}
            />
            <NumericFormat
              customInput={Input}
              className="w-16"
              suffix="x"
              allowNegative={false}
              decimalScale={2}
              allowLeadingZeros={false}
              isAllowed={(values) => (values?.floatValue ?? 0) <= 5}
              onValueChange={({ floatValue }) => {
                setMultiplier(floatValue);
              }}
              value={multiplier}
              defaultValue={0}
            />
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          The reward multiplier takes your allocation and multiplies it&apos;s
          effects across open source projects. Projects must have open source
          licenses in all of their Github repos to qualify. We adhered to the
          Open Source Initiative&apos;s definition of open source software.{" "}
          <Link href="#" className="font-semibold">
            Learn more
          </Link>
        </div>
        <Separator />
      </div>
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Checkbox id="rewardOpenSource" />
        <label
          htmlFor="rewardOpenSource"
          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I want to exclude all projects that are not open source.{" "}
          <Link href="#" className="font-semibold">
            Learn more
          </Link>
        </label>
      </div>
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
