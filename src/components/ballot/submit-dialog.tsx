import { ComponentProps, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Feedback, Form } from "./feedback-form";
import { Heading } from "../ui/headings";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { votingEndDate } from "@/config";
import { format } from "date-fns";

export function SubmitDialog({
  open,
  onOpenChange,
}: ComponentProps<typeof Dialog>) {
  const [feedbackProgress, setFeedbackProgress] = useState<
    "init" | "in_progress" | "done"
  >("init");
  return (
    <Dialog open={open}>
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
                  <Feedback onSubmit={() => setFeedbackProgress("done")} />
                </Form>
              );
            case "done":
              return (
                <div className="flex flex-col gap-2">
                  <Heading variant="h3" className="text-center">
                    Submit your ballot
                  </Heading>
                  <Text className="text-muted-foreground text-center">
                    <div>
                      You can make changes and resubmit your ballot until{" "}
                    </div>
                    {format(votingEndDate, "MMM d")} at{" "}
                    {format(votingEndDate, "hh:mm a")} UTC.
                  </Text>
                  <Button
                    variant="destructive"
                    onClick={() => alert("not implemented yet")}
                  >
                    Submit ballot
                  </Button>
                  <Button variant="ghost">Cancel</Button>
                </div>
              );
          }
        })()}
      </DialogContent>
    </Dialog>
  );
}
