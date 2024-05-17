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
  allocation_asc: "Low to high",
  allocation_desc: "High to low",
} as const;
export type SortType = keyof typeof sortLabels;

export enum OrderBy {
  name = "name",
  allocation = "allocation",
}
export enum SortOrder {
  asc = "asc",
  desc = "desc",
}
export function useMetricsFilter() {
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

export function useBallotFilter() {
  return useQueryStates(
    {
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

export function decode(val: string) {
  const [order, sort] = val.split("_") as [OrderBy, SortOrder];
  return { order, sort };
}
export function encode(filter: { order: OrderBy; sort: SortOrder }) {
  return `${filter.order}_${filter.sort}` as const;
}
