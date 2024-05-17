"use client";
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBallotContext } from "../ballot/provider";
import { useMetricIds } from "@/hooks/useMetrics";

export function ReviewBallotToast() {
  const { state } = useBallotContext();
  const { data } = useMetricIds();
  const isEmpty = !Object.keys(state).length;
  return (
    <ToastProvider>
      <Toast className="flex gap-1" open={isEmpty}>
        <ToastTitle>Your ballot is empty</ToastTitle>
        <Link href={`/metrics/${data?.[0]}`}>
          <Button variant={"outline"}>Review metrics</Button>
        </Link>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
