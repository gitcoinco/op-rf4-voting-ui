"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useAddComment } from "@/hooks/useComments";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";

export function AddCommentButton() {
  const add = useAddComment();
  const form = useForm();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add a comment</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((values) => {
              console.log(values);
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
              <Button type="submit" variant={"destructive"}>
                Comment
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
