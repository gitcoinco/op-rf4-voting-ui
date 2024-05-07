"use client";
import { NumericFormat } from "react-number-format";
import { Lock, LockOpen, Minus, Plus, Trash2 } from "lucide-react";
import { useController, useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/common/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type Metric = { id: string; name: string; amount?: number };

function useLockState() {
  const queryClient = useQueryClient();

  const { data, mutateAsync } = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount?: number }) =>
      queryClient.setQueryData(
        ["locked-metrics"],
        (prev: Record<string, number>) => ({ ...prev, [id]: amount })
      ),
  });

  return [data, mutateAsync] as unknown as [
    Record<string, number>,
    (params: { id: string; amount?: number }) => void
  ];
}

export function BallotEditor() {
  const { control } = useFormContext<{
    metrics: Metric[];
  }>();

  const { fields, remove } = useFieldArray({
    name: "metrics",
    keyName: "key",
    control,
  });

  return (
    <div className="divide-y border-y">
      {fields.map((metric, index) => {
        return (
          <div
            key={metric.id}
            className="py-4 flex justify-between items-center"
          >
            <h3 className="font-medium text-sm">{metric.name}</h3>
            <div className="flex gap-2">
              <LockButton name={`metrics.${index}.amount`} id={metric.id} />
              <div className="flex border rounded-lg">
                <DecButton name={`metrics.${index}.amount`} />
                <MetricInput name={`metrics.${index}.amount`} />
                <IncButton name={`metrics.${index}.amount`} />
              </div>
              <Button
                size="icon"
                className="rounded-full"
                variant="ghost"
                icon={Trash2}
                tabIndex={-1}
                onClick={() => remove(index)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IncButton({ name = "" }) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const amount = field.value ?? 0;
  return (
    <Button
      size={"icon"}
      variant="ghost"
      icon={Plus}
      tabIndex={-1}
      disabled={amount >= 100}
      onClick={() => field.onChange(amount + 5)}
    />
  );
}

function DecButton({ name = "" }) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const amount = field.value ?? 0;
  return (
    <Button
      size={"icon"}
      variant="ghost"
      icon={Minus}
      tabIndex={-1}
      disabled={amount <= 0}
      onClick={() => field.onChange(amount - 5)}
    />
  );
}

function LockButton({ id = "", name = "" }) {
  const [locked, setLocked] = useLockState();
  const isLocked = locked?.[id];
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const amount = field.value ?? 0;

  return (
    <Button
      size={"icon"}
      variant="ghost"
      icon={isLocked ? Lock : LockOpen}
      disabled={!amount}
      className={cn("rounded-full", { ["opacity-50"]: !isLocked })}
      tabIndex={-1}
      onClick={() => setLocked({ id, amount: isLocked ? 0 : amount })}
    />
  );
}

function MetricInput({ name = "" }) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <NumericFormat
      min={0}
      max={100}
      suffix={"%"}
      allowNegative={false}
      allowLeadingZeros={false}
      isAllowed={(values) => (values?.floatValue ?? 0) <= 100}
      customInput={(p) => (
        <input className="w-16 text-center" {...p} max={100} min={0} />
      )}
      placeholder="--%"
      value={field.value}
      // Must use onBlur or tabs focus issues
      onBlur={(e) => {
        e.preventDefault();
        field.onChange(parseFloat(e.target.value));
      }}
    />
  );
}
