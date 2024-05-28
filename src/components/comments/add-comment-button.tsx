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
import { useAddComment } from "@/hooks/useComments";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useState } from "react";

export function AddCommentButton({ metricId = "" }) {
  const [isOpen, setOpen] = useState(false);
  const add = useAddComment();
  const form = useForm();
  return (
    <Dialog open={isOpen}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Add a comment
      </Button>
      <DialogContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(({ comment }) => {
              add.mutate(
                { comment, metricId },
                { onSuccess: () => setOpen(false) }
              );
            })}
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
