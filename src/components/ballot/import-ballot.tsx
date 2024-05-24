"use client";

import { useCallback, useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { format, parse } from "@/lib/csv";
import { Allocation, useSaveAllocation } from "@/hooks/useBallot";
import { useBallotEditor } from "@/hooks/useBallotEditor";

export function ImportBallotDialog({}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Import ballot</Button>
      </DialogTrigger>
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
  const save = useSaveAllocation();
  const editor = useBallotEditor({ onUpdate: save.mutate });

  const ref = useRef<HTMLInputElement>(null);

  const importCSV = useCallback((csvString: string) => {
    console.log("import csv");
    // Parse CSV and build the ballot data (remove name column)
    const { data } = parse<Allocation>(csvString);
    const allocations = data.map(({ metricId, allocation }) => ({
      metricId,
      allocation: Number(allocation),
    }));
    console.log(allocations);
    editor.reset(allocations, true);
  }, []);

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
          if (!file) return;
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = () => importCSV(String(reader.result));
          reader.onerror = () => console.log(reader.error);
        }}
      />
    </>
  );
}
function ExportBallotButton() {
  const exportCSV = useCallback(async () => {
    const csv = format([], { columns: ["metricId", "allocation"] });
    window.open(`data:text/csv;charset=utf-8,${csv}`);
  }, []);

  return (
    <Button variant="outline" onClick={exportCSV}>
      Download ballot template
    </Button>
  );
}
