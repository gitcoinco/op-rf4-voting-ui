"use client";
import { NumericFormat } from "react-number-format";
import { Lock, LockOpen, Minus, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/common/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type Metric = { id: string; name: string; amount?: number };

function useLockState() {
  const queryClient = useQueryClient();

  const { data, mutateAsync } = useMutation({
    mutationFn: async (id: string, amount?: number) =>
      queryClient.setQueryData(
        ["locked-metrics"],
        (prev: Record<string, number>) => ({ ...prev, [id]: amount })
      ),
  });

  return [data, mutateAsync] as unknown as [
    Record<string, number>,
    (id: string, amount?: number) => void
  ];
}

export function BallotEditor() {
  // const [locked, setLocked] = useLockState();

  const { control, setValue, getValues, watch } = useFormContext<{
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
        const amount = watch(`metrics.${index}.amount`);
        // const amount = getValues(`metrics.${index}.amount`);
        // const amount = getValues()
        console.log(amount);
        // const isLocked = locked?.[metric.id];
        return (
          <div
            key={metric.id}
            className="py-4 flex justify-between items-center"
          >
            <h3 className="font-medium text-sm">{metric.name}</h3>
            <div className="flex gap-2">
              {/* <Button
                size={"icon"}
                variant="ghost"
                icon={isLocked ? Lock : LockOpen}
                className={cn("rounded-full", { ["opacity-30"]: !isLocked })}
                tabIndex={-1}
                onClick={() => setLocked(metric.id, amount)}
              /> */}
              <div className="flex border rounded-lg">
                <Button
                  size={"icon"}
                  variant="ghost"
                  icon={Minus}
                  tabIndex={-1}
                  disabled={(amount ?? 0) <= 0}
                  onClick={() =>
                    setValue(
                      `metrics.${index}`,
                      { ...metric, amount: (amount ?? 0) - 5 },
                      { shouldValidate: true }
                    )
                  }
                />
                <NumericFormat
                  min={0}
                  max={100}
                  suffix={"%"}
                  allowNegative={false}
                  allowLeadingZeros={false}
                  isAllowed={(values) => (values?.floatValue ?? 0) <= 100}
                  customInput={(p) => (
                    <input
                      className="w-16 text-center"
                      {...p}
                      max={100}
                      min={0}
                    />
                  )}
                  placeholder="--%"
                  value={amount}
                  onValueChange={({ floatValue }) => {
                    setValue(
                      `metrics.${index}`,
                      {
                        ...metric,
                        amount: floatValue,
                      },
                      { shouldValidate: true }
                    );
                  }}
                />
                <IncButton index={index} metric={metric} />
                {/* <Button
                  size={"icon"}
                  variant="ghost"
                  icon={Plus}
                  tabIndex={-1}
                  disabled={(amount ?? 0) >= 100}
                  onClick={() =>
                    setValue(
                      `metrics.${index}`,
                      { ...metric, amount: (amount ?? 0) + 5 },
                      {
                        shouldValidate: true,
                        shouldTouch: true,
                      }
                    )
                  }
                /> */}
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

function IncButton({ index, metric }: { index: number; metric: Metric }) {
  const { watch, setValue } = useFormContext();
  const amount = watch(`metrics.${index}.amount`);

  console.log(amount);
  return (
    <Button
      size={"icon"}
      variant="ghost"
      icon={Plus}
      tabIndex={-1}
      disabled={(amount ?? 0) >= 100}
      onClick={() =>
        setValue(
          `metrics.${index}`,
          { ...metric, amount: (amount ?? 0) + 5 },
          {
            shouldValidate: true,
            shouldTouch: true,
          }
        )
      }
    />
  );
}
