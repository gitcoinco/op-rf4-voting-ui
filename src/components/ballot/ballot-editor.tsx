"use client";
import { NumericFormat } from "react-number-format";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/common/button";

type Metric = { id: string; name: string; amount?: number };

export function BallotEditor() {
  const { control, setValue, watch } = useFormContext<{
    metrics: Metric[];
  }>();

  const { fields, remove } = useFieldArray({
    name: "metrics",
    keyName: "key",
    control,
  });

  const total = 0;

  return (
    <div className="divide-y border-y">
      {fields.map((metric, index) => {
        const amount = watch(`metrics.${index}.amount`);
        return (
          <div
            key={metric.id}
            className="py-4 flex justify-between items-center"
          >
            <h3 className="font-medium text-sm">{metric.name}</h3>
            <div className="flex gap-2">
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
                    setValue(`metrics.${index}`, {
                      ...metric,
                      amount: floatValue,
                    });
                  }}
                />

                <Button
                  size={"icon"}
                  variant="ghost"
                  icon={Plus}
                  tabIndex={-1}
                  disabled={(amount ?? 0) >= 100 || total >= 100}
                  onClick={() =>
                    setValue(
                      `metrics.${index}`,
                      { ...metric, amount: (amount ?? 0) + 5 },
                      { shouldValidate: true }
                    )
                  }
                />
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
