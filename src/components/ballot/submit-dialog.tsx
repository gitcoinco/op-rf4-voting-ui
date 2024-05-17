import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Feedback, Form } from "./feedback-form";
import { Heading } from "../ui/headings";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const RangeFormSchema = z.object({
  rating: z.number().min(0).max(10),
  comment: z.string().optional(),
});

const FormSchema = z.object({
  index: z.number().default(0),
  votingTime: z.number(),
  votingExperience: z.array(z.string()),

  voting: RangeFormSchema,
  concern: RangeFormSchema,
  confidence: RangeFormSchema,
  satisfied: RangeFormSchema,
});

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
                    voting: {},
                    concern: {},
                    confidence: {},
                    satisfied: {},
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
