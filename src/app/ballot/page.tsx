"use client";
import { useAccount } from "wagmi";
import { EmptyBallot, NonBadgeholder } from "@/components/ballot/ballot-states";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/common/button";
import { ChevronDown, Info } from "lucide-react";
import { metrics } from "@/data/metrics";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SubmitDialog } from "@/components/ballot/submit-dialog";
import { BallotEditor } from "../../components/ballot/ballot-editor";
import { FormProvider, useForm } from "react-hook-form";

export default function BallotPage() {
  const { address } = useAccount();
  const isEmptyBallot = !Boolean(address);

  return <YourBallot />;
  if (isEmptyBallot) {
    return <EmptyBallot />;
  }
  return (
    <div>
      <NonBadgeholder />
    </div>
  );
}

function YourBallot() {
  const [isSubmitting, setSubmitting] = useState(false);
  const ballotMetrics = metrics.slice(0, 5);

  const form = useForm({
    defaultValues: { metrics: ballotMetrics },
    mode: "onBlur",
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading variant={"h3"}>Your ballot</Heading>
          <Text>You&apos;ve added 5 of 20 metrics</Text>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="secondary" icon={ChevronDown} iconSide="right">
                A-Z
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sorting</DropdownMenuLabel>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
              <DropdownMenuItem>Z-A</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={"secondary"}>Weight evenly</Button>
        </div>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            console.log("form", values);
            setSubmitting(true);
          })}
        >
          <BallotEditor />
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
            <Button variant={"destructive"} type="submit">
              Submit ballot
            </Button>
            <span className="text-sm text-destructive">
              Weights must add up to 100%
            </span>
          </div>
        </form>
      </FormProvider>

      <SubmitDialog
        open={isSubmitting}
        onOpenChange={() => setSubmitting(false)}
      />
    </Card>
  );
}
