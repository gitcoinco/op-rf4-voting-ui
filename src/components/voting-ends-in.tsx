"use client";
import { ComponentProps, PropsWithChildren } from "react";
import { createGlobalState, useHarmonicIntervalFn } from "react-use";

const useEndDate = createGlobalState<string[]>(["00", "00", "00"]);
export function useVotingTimeLeft(date: Date) {
  const [state, setState] = useEndDate();

  useHarmonicIntervalFn(() => setState(calculateTimeLeft(date)), 1000);

  return state;
}
export const VotingEndsIn = ({
  date,
  ...props
}: ComponentProps<"span"> & { date: Date }) => {
  const [days, hours, minutes, seconds] = useVotingTimeLeft(date);
  if (Number(seconds) < 0) {
    return <div>Voting has ended</div>;
  }

  return (
    <span {...props}>
      <TimeSlice>{days}d</TimeSlice>:<TimeSlice>{hours}h</TimeSlice>:
      <TimeSlice>{minutes}m</TimeSlice>
    </span>
  );
};

const TimeSlice = (props: PropsWithChildren) => (
  <span className="text-gray-900 dark:text-gray-300 px-1" {...props} />
);

export const calculateTimeLeft = (date: Date): string[] => {
  const sec = Math.floor((date.getTime() - Date.now()) / 1000);
  const min = Math.floor(sec / 60);
  const hrs = Math.floor(min / 60);
  const days = Math.floor(hrs / 24);

  return [days % 365, hrs % 24, min % 60, sec % 60].map(String);
};
