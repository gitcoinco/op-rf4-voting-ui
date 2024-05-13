import { Input } from "../ui/input";
import { Button } from "../common/button";
import { Heading } from "../ui/headings";
import { Badge } from "../ui/badge";

import z from "zod";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

import { Slider } from "@/components/ui/slider";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { ChevronLeft } from "lucide-react";
import { PropsWithChildren } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RangeFormSchema = z.object({
  rating: z.number().min(0).max(10),
  comment: z.string().optional(),
});
const FormSchema = z.object({
  index: z.number().default(0),
  votingTime: z.number(),
  votingExperience: z.array(z.string()),

  voting: RangeFormSchema,
  concern: RangeFormSchema,
  confidence: RangeFormSchema,
  satisfied: RangeFormSchema,
});

export function Form({
  children,
  defaultValues,
}: PropsWithChildren<{ defaultValues: Record<string, unknown> }>) {
  const form = useForm({
    defaultValues,
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

export function Feedback({ onSubmit = () => {} }) {
  const { handleSubmit, register, setValue, watch } = useFormContext();
  const index = watch("index") ?? 0;

  const questions = [
    {
      title: "How much time did you spend on voting in this round (in hours)?",
      children: (
        <Input
          {...register("votingTime", { valueAsNumber: true, required: true })}
          type="number"
          placeholder="Ex: 10 hours"
        />
      ),
    },
    {
      title: "Please rate the voting experience",
      children: (
        <SelectForm
          name="voting"
          options={Array(10)
            .fill(0)
            .map((_, index) => ({
              label: `${index} ${
                index === 0 ? "(shit)" : index === 9 ? "(amazing ✨)" : ""
              }`,
              value: String(index),
            }))}
        />
      ),
    },
    {
      title: `Did you observe any behavior among your fellow badgeholders that could be considered one of the following (select all that apply)?`,
      children: <Behaviors />,
    },
    {
      title:
        "How worried are you about detrimental behavior among badgeholders influencing the allocation of Retro Funding in this round?",
      description:
        "Examples are collusion, bribery, self-dealing, or other behaviors at odds with the goals of the Collective.",
      children: (
        <SelectForm
          name="concern"
          options={Array(7)
            .fill(0)
            .map((_, index) => ({
              label: `${index} ${
                index === 0
                  ? "(not worried)"
                  : index === 3
                  ? "(somewhat worried)"
                  : index === 6
                  ? "(very worried)"
                  : ""
              }`,
              value: String(index),
            }))}
        />
      ),
    },
    {
      title:
        "Given the design of this round, how confident do you feel that funding will be allocated efficiently to the most deserving projects?",
      children: (
        <SelectForm
          name="confidence"
          options={Array(7)
            .fill(0)
            .map((_, index) => ({
              label: `${index} ${
                index === 0
                  ? "(very low confidence)"
                  : index === 3
                  ? "(some confidence)"
                  : index === 6
                  ? "(very high confidence)"
                  : ""
              }`,
              value: String(index),
            }))}
        />
      ),
    },
    {
      title:
        "How satisfied do you feel with the definition of profit, compared to round 3?",
      description:
        "Definition: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
      children: (
        <SelectForm
          name="satisfied"
          options={Array(7)
            .fill(0)
            .map((_, index) => ({
              label: `${index} ${
                index === 0
                  ? "(not satisfied)"
                  : index === 3
                  ? "(somewhat satisfied)"
                  : index === 6
                  ? "(very satisfied)"
                  : ""
              }`,
              value: String(index),
            }))}
        />
      ),
    },
  ];

  const { title, description, children } = questions[index];
  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values);
        if (index < questions.length - 1) {
          setValue("index", index + 1);
        } else {
          onSubmit();
        }
      })}
    >
      <input type="hidden" {...register("index")} />
      <div className="space-y-8">
        <div className="flex justify-center">
          <Badge variant={"secondary"} className="text-muted-foreground">
            {index + 1} of {questions.length}
          </Badge>
        </div>
        <div className="space-y-2">
          <Heading variant={"h3"} className="text-center">
            {title}
          </Heading>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
        {index > 0 && (
          <Button
            icon={ChevronLeft}
            variant="ghost"
            size={"icon"}
            className="absolute -top-[28px] left-2 rounded-full"
            disabled={index === 0}
            onClick={() => setValue("index", index - 1)}
          />
        )}
        <Button type="submit" className="w-full" variant={"destructive"}>
          Continue
        </Button>
      </div>
    </form>
  );
}

function Behaviors() {
  const { control, register } = useFormContext();
  const { field } = useController({ name: "behaviors", control });

  return (
    <div className="">
      <div className="space-y-2 mb-4">
        {[
          { id: "collusion", label: "Collusion" },
          { id: "bribery", label: "Bribery" },
          { id: "self-dealing", label: "Self dealing" },
          { id: "other", label: "Other form of capture" },
        ].map((item, i) => (
          <label key={i} htmlFor={item.id} className="block cursor-pointer">
            <Card className="px-4 py-3 flex gap-2 items-center w-full">
              <Checkbox
                id={item.id}
                checked={field.value?.includes(item.id)}
                onCheckedChange={(checked) =>
                  checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                        field.value.filter((v: string) => v !== item.id)
                      )
                }
              />
              {item.label}
            </Card>
          </label>
        ))}
      </div>
      <Textarea
        {...register("behaviorComment")}
        placeholder="Please feel free to elaborate here. Reminder that these responses are anonymous..."
      />
    </div>
  );
}

function SelectForm({
  name = "",
  options = [],
}: {
  name: string;
  options: { value: string; label: string }[];
}) {
  const _name = `${name}.rating`;
  const { control, watch, register, formState } = useFormContext();
  const { field } = useController({ name: _name, control });

  return (
    <div className="space-y-2">
      <Select
        required
        value={field.value}
        defaultValue={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        {...register(`${name}.comment`)}
        placeholder="Please feel free to elaborate here. Reminder that these responses are anonymous..."
      />
    </div>
  );
}
function RangeForm({ name = "" }) {
  const _name = `${name}.rating`;
  const { control, watch, register } = useFormContext();
  const value = watch(_name) ?? [];
  const { field } = useController({ name: _name, control });

  return (
    <div className="">
      <div className="flex items-center gap-2 w-full">
        <span className="">🙁</span>
        <div className="flex-1">
          <Slider
            defaultValue={[5]}
            max={10}
            step={1}
            value={field.value?.[0]}
            onValueChange={([value]) => {
              field.onChange(value);
            }}
          />
        </div>
        <span className="">🙂</span>
      </div>
      <div className="text-center">{value}</div>
      <Textarea
        {...register(`${name}.comment`)}
        placeholder="Please feel free to elaborate here. Reminder that these responses are anonymous..."
      />
    </div>
  );
}
