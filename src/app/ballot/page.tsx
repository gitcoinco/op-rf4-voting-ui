"use client";
import { useAccount } from "wagmi";
import { EmptyBallot, NonBadgeholder } from "@/components/ballot/ballot-states";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ArrowDownToLineIcon, LoaderIcon } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";
import { SubmitDialog, downloadImage } from "@/components/ballot/submit-dialog";
import { MetricsEditor } from "../../components/metrics-editor";
import {
  MAX_MULTIPLIER_VALUE,
  useBallot,
  useBallotWeightSum,
  useIsSavingBallot,
  useOsMultiplier,
} from "@/hooks/useBallot";
import { useMetrics } from "@/hooks/useMetrics";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { useBallotContext } from "@/components/ballot/provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";
import { useIsBadgeholder } from "@/hooks/useIsBadgeholder";
import { ManualDialog } from "../../components/common/manual-dialog";
import { PageView } from "@/components/common/page-view";
import Image from "next/image";
import VotingSuccess from "../../../public/RetroFunding_Round4_IVoted@2x.png";
import { votingEndDate } from "@/config";
import { useVotingTimeLeft } from "@/components/voting-ends-in";

export default function BallotPage() {
  return (
    <>
      <PageView title="Ballot" />
      <CheckBallotState />
    </>
  );
}

function CheckBallotState() {
  const { address, isConnecting } = useAccount();
  const { isPending } = useBallot(address);
  const { state } = useBallotContext();
  if (isPending) {
    return <Skeleton className="p-6 h-96" />;
  }
  if (!address && !isConnecting) {
    return <NonBadgeholder />;
  }
  const isEmptyBallot = !Object.keys(state).length;
  if (isEmptyBallot) {
    return <EmptyBallot />;
  }
  return <YourBallot />;
}

function YourBallot() {
  const [isSubmitting, setSubmitting] = useState(false);
  const metrics = useMetrics();

  const { ballot } = useBallotContext();

  return (
    <div className="space-y-4">
      {ballot?.status === "SUBMITTED" && (
        <Alert variant={"accent"}>
          <div className="flex gap-2 text-sm items-center">
            <p>
              Your ballot was submitted on {formatDate(ballot?.published_at)}.
              You can make changes and resubmit until{" "}
              {formatDate(votingEndDate)}. To do so, simply edit the ballot
              below and submit again.
            </p>
            <div
              className="flex gap-4 items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => downloadImage(document.querySelector("#download"))}
            >
              <Image
                id="download"
                {...VotingSuccess}
                alt="Success!"
                className="rounded-xl max-w-[142px]"
              />
              <Button
                icon={ArrowDownToLineIcon}
                size="icon"
                variant={"ghost"}
              />
            </div>
          </div>
        </Alert>
      )}
      <Card className="p-6 space-y-8">
        <MetricsEditor metrics={metrics.data} isLoading={metrics.isPending} />
        <OpenSourceMultiplier initialValue={ballot?.os_multiplier} />

        <div className="flex items-center gap-4">
          <BallotSubmitButton onClick={() => setSubmitting(true)} />

          <WeightsError />
          <IsSavingBallot />
        </div>

        {ballot?.address && (
          <SubmitDialog
            ballot={ballot!}
            open={isSubmitting}
            onOpenChange={() => setSubmitting(false)}
          />
        )}
      </Card>
    </div>
  );
}

function BallotSubmitButton({ onClick }: ComponentProps<typeof Button>) {
  const allocationSum = useBallotWeightSum();
  const isBadgeholder = useIsBadgeholder();
  const [days, hours, minutes, seconds] = useVotingTimeLeft(votingEndDate);

  if (Number(seconds) < 0) {
    return null;
  }
  return (
    <Button
      disabled={allocationSum !== 100}
      variant={"destructive"}
      type="submit"
      onClick={onClick}
    >
      Submit ballot
    </Button>
  );
}

function OpenSourceMultiplier({ initialValue = 0 }) {
  const { mutate, variables } = useOsMultiplier();

  const multiplier = variables ?? initialValue;
  return (
    <Card className="p-4">
      <div className="space-y-4 mb-4">
        <div className="text-muted-foreground text-xs">Optional</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="font-medium text-sm">
              Add an open source reward multiplier
            </div>
            <Badge
              variant={multiplier > 1 ? "destructive" : "secondary"}
              className="cursor-pointer"
            >
              {multiplier > 1 ? "On" : "Off"}
            </Badge>
          </div>

          <div className="flex gap-2 flex-1">
            <Slider
              value={[multiplier]}
              onValueChange={([v]) => mutate(v)}
              min={1.0}
              step={0.1}
              max={MAX_MULTIPLIER_VALUE}
            />
            <NumericFormat
              customInput={OpenSourceInput}
              className="w-16"
              suffix="x"
              allowNegative={false}
              decimalScale={2}
              allowLeadingZeros={false}
              isAllowed={(values) =>
                (values?.floatValue ?? 0) <= MAX_MULTIPLIER_VALUE
              }
              onValueChange={({ floatValue }) => mutate(floatValue ?? 0)}
              value={multiplier ?? 0}
              defaultValue={0}
            />
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          The reward multiplier takes your allocation and multiplies its effects
          across open source projects. Projects must have open source licenses
          in all of the Github repos, which contain their contract code, to
          qualify. We adhered to the Open Source Initiative&apos;s definition of
          open source software.{" "}
          <ManualDialog>
            <div
              // onClick={() => setOpen(true)}
              className="font-semibold"
            >
              Learn more
            </div>
          </ManualDialog>
        </div>
        <Separator />
      </div>
    </Card>
  );
}

function OpenSourceInput(props: ComponentProps<typeof Input>) {
  return <Input {...props} />;
}

function WeightsError() {
  const allocationSum = useBallotWeightSum();

  if (allocationSum === 100) return null;

  return (
    <span className="text-sm text-destructive">
      Weights must add up to 100%
    </span>
  );
}

function IsSavingBallot() {
  const isSavingBallot = useIsSavingBallot();

  return isSavingBallot ? (
    <span className="flex gap-2">
      <LoaderIcon className={"animate-spin size-4"} />
      <span className="text-xs">Saving ballot...</span>
    </span>
  ) : null;
}
