"use client";
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";

export const sortLabels = {
  name_asc: "A to Z",
  name_desc: "Z to A",
  time_asc: "Oldest",
  time_desc: "Newest",
} as const;
export type SortType = keyof typeof sortLabels;

export enum OrderBy {
  name = "name",
}
export enum SortOrder {
  asc = "asc",
  desc = "desc",
}
export function useFilter() {
  return useQueryStates(
    {
      search: parseAsString.withDefault(""),
      inBallot: parseAsBoolean.withDefault(false),
      order: parseAsStringEnum<OrderBy>(Object.values(OrderBy)).withDefault(
        OrderBy.name
      ),
      sort: parseAsStringEnum<SortOrder>(Object.values(SortOrder)).withDefault(
        SortOrder.asc
      ),
    },
    { history: "replace" }
  );
}
