import { ComponentProps, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Feedback, Form } from "./feedback-form";
import { Heading } from "../ui/headings";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { votingEndDate } from "@/config";
import { Ballot, useSubmitBallot } from "@/hooks/useBallot";
import { formatDate } from "@/lib/utils";
import { exportBallot } from "./import-ballot";
import SunnySuccess from "../../../public/sunny_success.svg";
import Image from "next/image";

export function SubmitDialog({
  open,
  ballot,
  onOpenChange,
}: ComponentProps<typeof Dialog> & { ballot?: Ballot }) {
  const [feedbackProgress, setFeedbackProgress] = useState<
    "init" | "in_progress" | "submit" | "done"
  >(ballot?.status === "SUBMITTED" ? "submit" : "init");

  const submit = useSubmitBallot({
    onSuccess: () => setFeedbackProgress("done"),
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {(() => {
          switch (feedbackProgress) {
            case "init":
              return (
                <div className="flex flex-col gap-2">
                  <Heading variant="h3" className="text-center">
                    Before submitting your ballot, please answer the following
                    questions.
                  </Heading>
                  <Text className="text-muted-foreground">
                    Your responses will directly inform the design of future
                    rounds, so thank you for taking the time to respond!
                  </Text>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => setFeedbackProgress("in_progress")}
                  >
                    Continue
                  </Button>
                </div>
              );
            case "in_progress":
              return (
                <Form
                  defaultValues={{
                    index: 0,
                    behaviors: [],
                  }}
                >
                  <Feedback onSubmit={() => setFeedbackProgress("submit")} />
                </Form>
              );
            case "submit":
              return (
                <div className="flex flex-col gap-2">
                  <Heading variant="h3" className="text-center">
                    Submit your ballot
                  </Heading>
                  <Text className="text-muted-foreground text-center">
                    <div>
                      You can make changes and resubmit your ballot until{" "}
                    </div>
                    {formatDate(votingEndDate)}
                  </Text>
                  <Button
                    variant="destructive"
                    isLoading={submit.isPending}
                    disabled={submit.isPending}
                    onClick={() => submit.mutate()}
                  >
                    Submit ballot
                  </Button>
                  <Button variant="ghost" onClick={() => onOpenChange?.(false)}>
                    Cancel
                  </Button>
                </div>
              );
            case "done":
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center">
                    <Image {...SunnySuccess} alt="Success!" />
                  </div>
                  <Heading variant="h3" className="text-center">
                    Your vote has been received!
                  </Heading>
                  <Text className="text-muted-foreground text-center">
                    Thank you for your participation in Retro Funding Round 4
                    Voting! Your work as a badgeholder is crucial to the
                    improvement of the Superchain.
                  </Text>
                  <Button
                    variant="destructive"
                    isLoading={submit.isPending}
                    disabled={submit.isPending}
                    onClick={() => exportBallot(ballot?.allocations ?? [])}
                  >
                    Export your ballot
                  </Button>
                  <Button variant="ghost" onClick={() => onOpenChange?.(false)}>
                    Close
                  </Button>
                </div>
              );
          }
        })()}
      </DialogContent>
    </Dialog>
  );
}
