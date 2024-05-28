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
import { Comment, useAddComment } from "@/hooks/useComments";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { ComponentProps } from "react";

export function CommentDialog({
  isOpen,
  editingComment,
  setOpen,
  onSave,
}: {
  isOpen: boolean;
  editingComment: Comment | null;
  setOpen: ComponentProps<typeof Dialog>["onOpenChange"];
  onSave: (comment: string) => void;
}) {
  const add = useAddComment();
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
              <DialogDescription>
                Interactions from Trusted Optimism Users
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Enter text..."
              rows={8}
              maxLength={1000}
              {...form.register("comment", { required: true })}
            />
            <div className="flex flex-col">
              <Button
                isLoading={add.isPending}
                disabled={add.isPending}
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
