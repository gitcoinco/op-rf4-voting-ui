"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Comment } from "@/hooks/useComments";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { ComponentProps } from "react";
import { useMetricById } from "@/hooks/useMetrics";

export function CommentDialog({
  isOpen,
  isLoading,
  metricId,
  editingComment,
  setOpen,
  onSave,
}: {
  isOpen: boolean;
  isLoading: boolean;
  editingComment: Comment | null;
  metricId: string;
  setOpen: ComponentProps<typeof Dialog>["onOpenChange"];
  onSave: (comment: string) => void;
}) {
  const { data: metric } = useMetricById(metricId);
  const form = useForm({
    defaultValues: { comment: editingComment?.comment ?? "" },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(({ comment }) => onSave(comment))}
          >
            <DialogHeader>
              <DialogTitle>Add comment</DialogTitle>
              <DialogDescription>{metric?.name}</DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Enter text..."
              rows={8}
              maxLength={1000}
              {...form.register("comment", { required: true })}
            />
            <div className="flex flex-col">
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
                variant={"destructive"}
              >
                Comment
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
