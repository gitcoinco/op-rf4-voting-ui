import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ComponentProps, useState } from "react";
import { Feedback, Form } from "./feedback-form";
import { Heading } from "../ui/headings";
import { Button } from "../common/button";
import { Text } from "../ui/text";

export function SubmitDialog({
  open,
  onOpenChange,
}: ComponentProps<typeof Dialog>) {
  const [feedbackProgress, setFeedbackProgress] = useState<
    "init" | "in_progress" | "done"
  >("init");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {(() => {
          switch (feedbackProgress) {
            case "init":
              return (
                <div className="flex flex-col gap-2">
                  <Heading variant="h3" className="text-center">
                    Before submitting your ballot, please answer the following 6
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
                    voting: { rating: 5 },
                    concern: { rating: 5 },
                    confidence: { rating: 5 },
                    satisfied: { rating: 5 },
                  }}
                >
                  <Feedback onSubmit={() => setFeedbackProgress("done")} />
                </Form>
              );
            case "done":
              return (
                <div className="flex flex-col gap-2">
                  <Heading variant="h3" className="text-center">
                    Before submitting your ballot, please answer the following
                    [X] questions.
                  </Heading>
                  <Text className="text-muted-foreground">
                    You can make changes and resubmit your ballot until May 1 at
                    12:00 AM UTC.
                  </Text>
                  <Button variant="destructive">Submit ballot</Button>
                  <Button variant="ghost">Cancel</Button>
                </div>
              );
          }
        })()}
      </DialogContent>
    </Dialog>
  );
}
