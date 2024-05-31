"use client";

import { ComponentProps, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { format, parse } from "@/lib/csv";
import { Allocation } from "@/hooks/useBallot";
import { useBallotContext } from "./provider";
import { useMetricIds } from "@/hooks/useMetrics";

export function ImportBallotDialog({
  isOpen,
  onOpenChange,
}: ComponentProps<typeof Dialog> & { isOpen: boolean }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import ballot</DialogTitle>
          <DialogDescription>
            Heads up! If you import a ballot, you&apos;ll lose your existing
            work. The accepted format is .csv.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <ImportBallotButton />
          <ExportBallotButton />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ImportBallotButton() {
  const editor = useBallotContext();
  const { data: metricIds } = useMetricIds();

  const ref = useRef<HTMLInputElement>(null);

  const importCSV = useCallback(
    (csvString: string) => {
      console.log("import csv");
      // Parse CSV and build the ballot data (remove name column)
      const { data } = parse<Allocation>(csvString);
      const allocations = data
        .map(({ metric_id, allocation, locked }) => ({
          metric_id,
          allocation: Number(allocation),
          // Only the string "true" and "1" will be matched as locked
          locked: ["true", "1"].includes(String(locked)) ? true : false,
        }))
        .filter((m) => metricIds?.includes(m.metric_id));

      if (allocations.length !== data.length) {
        alert(
          "One or more of the metric IDs were not correct and have been removed."
        );
      }
      console.log(allocations);
      editor.reset(allocations);

      // TODO: save ballot to api
    },
    [metricIds, editor]
  );

  return (
    <>
      <Button variant="destructive" onClick={() => ref.current?.click()}>
        Import
      </Button>
      <input
        ref={ref}
        type="file"
        accept="*.csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => importCSV(String(reader.result));
            reader.onerror = () => console.log(reader.error);
          }
        }}
      />
    </>
  );
}

function ExportBallotButton() {
  const emptyBallot = [
    { metric_id: "trusted_daily_active_users", allocation: 0, locked: false },
  ];

  return (
    <Button variant="outline" onClick={() => exportBallot(emptyBallot)}>
      Download ballot template
    </Button>
  );
}

export function exportBallot(ballot: Allocation[]) {
  const csv = format(
    ballot.map((alloc) => ({
      metric_id: alloc.metric_id,
      allocation: alloc.allocation,
      locked: alloc.locked,
    })),
    {}
  );
  console.log(csv);
  window.open(`data:text/csv;charset=utf-8,${csv}`);
}
